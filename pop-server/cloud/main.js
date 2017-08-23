'use strict'
const userFunction = require('./users')
const stripe = require('./StripeFunctions')

var request = require('request').defaults({ encoding: null });
var Jimp = require("jimp");
var fs = require("fs");



// const bitly = new Bitly('752ea5696163f4d88160bc4a008166d60183d9ef');

// const httpProtocol = 'http://';
// const appDomain = '198.100.145.58';

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

// User functions
Parse.Cloud.define('getUsers', userFunction.getUsers)
Parse.Cloud.define('updatePopCoin', userFunction.updatePopCoin)

// Stripe functions
Parse.Cloud.define("stripeCharge", stripe.stripeCharge)
Parse.Cloud.define('getCards', stripe.getCards)

//
Parse.Cloud.define('getListPhoto', function(req, res) {
	if(!req.params.arrPhotos || req.params.arrPhotos.length === 0) {
		res.error("Missing params or wrong format: arrPhotos");
		return;
	}
	const responseAll = [];
	const listPhotos = req.params.arrPhotos;
	function photo_repeater(i) {
		if(i < listPhotos.length) {
			var query = new Parse.Query("Photos");
			query.get(listPhotos[i], function(photo) {
				if(photo) {
					responseAll.push(photo);
					photo_repeater(i + 1);
				} else {
					photo_repeater(i + 1);
				}
			}, function(error) {
				photo_repeater(i + 1);
			})
		} else {
			res.success(responseAll);
		}
	}
	photo_repeater(0);
})

Parse.Cloud.beforeSave("Category", function(req, res) {
	
	const newCategory = req.object;

	var Category = Parse.Object.extend("Category");
	var catQuery = new Parse.Query(Category);

	catQuery.get(newCategory.id, {
	  success: function(curCat) {
	    // The object was retrieved successfully.
		  let curCountUser = curCat.get('countUser');
		
			const action = newCategory.get('action');

			switch (action) {
				case 'ADD_USER':
					newCategory.set("countUser", (curCountUser ? curCountUser : 0) + 1);
					break;
				case 'REMOVE_USER':
					newCategory.set("countUser", (curCountUser ? curCountUser : 0) - 1);
					break;
				default:
					break;
			}

			newCategory.unset("action");

			res.success();
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
		  newCategory.set("countUser", 0);
		  newCategory.unset("action");

		  res.success();
	  }
	});

});
