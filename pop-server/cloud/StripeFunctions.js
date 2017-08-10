'use strict'

const stripeTestSecretKey = "sk_test_P97UxMQ2bXfzto8tkoKbh6Hq"
const stripeTestPublicKey = "pk_test_j0DRrC8XFPCeFW36VQ6NFgDS"

const stripe = require("stripe")(stripeTestSecretKey)

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
		if(!request.params.token) {
			response.error("Missing 'token'")
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
					charge(user, amount, detail, customer.id, response)
				}, function(error) {
					// The save failed.  Error is an instance of Parse.Error.
					response.error('save user error', error)
					return
				});
		});
	} else {
		// charge stripe customer
		charge(user, amount, detail, userStripeId, response)
	}
}

// Charge the user's card:
const charge = (user, amount, detail, customer, response) => {
	const journalId = detail.journalId

	const journalQuery = new Parse.Query('Journal')

	journalQuery.equalTo('objectId', journalId)
	journalQuery.first()
		.then(function (journal) {
			if (!journal) {
				response.error(err)
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
				customer: customer
				// customer: request.params.stripeCustomer,
			}, function(err, charge) {
				// asynchronously called
				if (!err) {
					journal.set('status', 'COMPLETED')
					journal.save()

					response.success(charge)
				} else {
					response.error('charge failed: ', err)
				}
			})
		})
		.catch(function () {
			response.error('journal lookup failed')
		})
}

// Parse.Cloud.define("stripeCreateCustomer", function(request, response){
//   if (!request.user) {
//     response.error("Must be signed in to call this Cloud Function.")
//     return;
//   }
//   var query = new Parse.Query("_User");

//   query.get(request.user.id).then(function(user){
//     if(user.get('role') === 'conso') {
//       if (!request.params.source) {
//         response.error("Missing source token");
//         return;
//       }
//       if (!request.params.nameCard) {
//         response.error("Missing nameCard");
//         return;
//       }
//       if (!request.params.numberCard) {
//         response.error("Missing numberCard");
//         return;
//       }
//       if (!request.params.expirationDate) {
//         response.error("Missing expirationDate");
//         return;
//       }

//       stripe.customers.create({
//         description: 'User: ' + user.get("email"),
//         source: request.params.source // obtained with Stripe.js
//       }, function(err, customer) {
//         // asynchronously called
//         if (err)
//           response.error(err);
//         else {
//           var listCards = user.get('visaCard') ? user.get('visaCard') : [];

//           listCards.push({
//             nameCard: request.params.nameCard,
//             numberCard: request.params.numberCard,
//             expirationDate: request.params.expirationDate,
//             customerId: customer.id
//           });

//           user.set('visaCard', listCards);
//           // save card
//           user.save(null,{useMasterKey:true}).then(
//             function(user){
//               response.success("Successfully updated user.");
//             }, function(error){
//               response.error(error);
//             })

//         }
//       });
//     } else {
//       response.error('Must be consomatrice user');
//     }
//   },
//   function(error) {
//     response.error(error);
//   });

// });
