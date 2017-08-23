"use strict"

var moment = require('moment')

const POPCOIN_AWARD_FOR_A_WEEK = 5

exports.getUsers = (req, res) => {
    if (!req.user) {
			res.error("Must be signed in to call this Cloud Function.");
			return;
    }

    const user = req.user.toJSON();
    if (user.role !== 'admin') {
        res.error("Your don't have permission to use this function.");
        return;
    }
    
    const query = new Parse.Query("_User");
    query.limit(1000)
    query.find({useMasterKey: true}).then(
        (users) => {
            res.success(users);
        },
        (error) => {
            res.error(error);
        }
    );
}

exports.updatePopCoin = (req, res) => {
	if (!req.user) {
		res.error("Must be signed in to call this Cloud Function.");
		return;
	}

	const user = req.user

	const lastAddedDate = user.get('addedPopCoinAt') || null
	const lastAddedWeek = lastAddedDate ? moment(lastAddedDate).week() : 0

	const thisWeek = moment().week()

	console.log(thisWeek, moment())
	console.log(lastAddedWeek, lastAddedDate)

	if (thisWeek === lastAddedWeek) {
		res.error(`User's POP coin has been added for this week`)
		return
	}

	if (thisWeek < lastAddedWeek) {
		res.error(`cheating huh?`)
		return
	}

	if (thisWeek > lastAddedWeek) {
		const currentPopCoin = user.get('popCoin') || 0

		user.set('popCoin', currentPopCoin + POPCOIN_AWARD_FOR_A_WEEK)

		let nowISO = {
			"__type": "Date",
			"iso": moment().toISOString()
		}

		console.log('nowISO: ', nowISO)

		user.set('addedPopCoinAt', nowISO)
		user.save(null, {useMasterKey: true})
			.then(
				(users) => {
					res.success(users)
				},
				(error) => {
					res.error(error.message)
				}
			)
	}
}