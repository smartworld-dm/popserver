'use strict'

const stripeSecretKey = "sk_test_P97UxMQ2bXfzto8tkoKbh6Hq"

const stripe = require("stripe")(stripeSecretKey)

exports.stripeCharge = (request, response) => {
	if (!request.user) {
		response.error("Must be signed in to call this Cloud Function.")
		return
	}

	// Check params
	if(!request.params.amount) {
		response.error("Missing 'amount'")
		return;
	}

	if(!request.params.detail) {
		response.error("Missing 'detail'")
		return;
	}
	if (!request.params.detail.journalId) {
		response.error("Missing journalId")
		return;
	}

	const user = request.user
	const amount = request.params.amount
	const detail = request.params.detail

	const userStripeId = user.get('stripeId')
	
	if (!userStripeId) { // hasn't a stripe customer yet
		if(!request.params.source) {
			response.error("Missing 'source'")
			return;
		}
		
		//create customer
		stripe.customers.create({
			description: '#' + user.id + ' - ' + user.get('email'),
			source: request.params.token // obtained with Stripe.js
		}, function(err, customer) {
			// asynchronously called
			if (err) {
				response.error(err)
				return
			}

			user.set('stripeId', customer.id)
			user.save(null, {useMasterKey: true})
				.then(function(user) {
					// The save was successful.
					charge(user, amount, detail, customer.id, null, response)
				}, function(error) {
					// The save failed.  Error is an instance of Parse.Error.
					response.error('save user error', error)
					return
				});
		});
	} else {
		let cardId = request.params && request.params.source
		// charge stripe customer
		charge(user, amount, detail, userStripeId, cardId, response)
	}
}

// Charge the user's card:
const charge = (user, amount, detail, customer, source, response) => {
	const journalId = detail.journalId

	const journalQuery = new Parse.Query('Journal')

	journalQuery.equalTo('objectId', journalId)
	journalQuery.first()
		.then(function (journal) {
			if (!journal) {
				response.error('journal lookup failed')
				return false
			}

			if (journal.get('status') === 'COMPLETED') {
				response.error('User has been paid for this journal')
				return false
			}

			stripe.charges.create({
				amount: amount * 100,
				currency: "aud",
				description: "Payment from user #" + user.id,
				metadata: detail,
				capture: true,
				customer: customer,
				source: source ? source : undefined
				// customer: request.params.stripeCustomer,
			}, function(err, charge) {
				// asynchronously called
				if (!err) {
					journal.set('status', 'COMPLETED')
					journal.set('orderStatus', 'PENDING')
					journal.save()

					response.success(charge)
				} else {
					response.error('charge failed: ', err)
				}
			})
		})
		.catch(function (error) {
			response.error(error)
		})
}

exports.getCards = (request, response) => {
	if (!request.user || !request.user.get('stripeId')) {
		// rejecting promise
		//return Promise.reject('error')
		response.error('user is not signed in or stripeID not found')
		return
	}

	let stripeId = request.user.get('stripeId')

	stripe.customers.retrieve(
		stripeId,
		function(err, customer) {
			// asynchronously called
			if (err) {
				response.error(err)
			} else {
				//console.log('stripe customer info: ', customer.sources.data)
				response.success(customer.sources.data)
			}
		}
	)
}