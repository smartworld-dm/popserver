'use strict'

const stripeTestSecretKey = "sk_test_P97UxMQ2bXfzto8tkoKbh6Hq";
const stripeTestPublicKey = "pk_test_j0DRrC8XFPCeFW36VQ6NFgDS";
// const Bitly = require('bitly');

const stripe = require("stripe")(stripeTestSecretKey);
var request = require('request').defaults({ encoding: null });
var Jimp = require("jimp");
var fs = require("fs");

// const bitly = new Bitly('752ea5696163f4d88160bc4a008166d60183d9ef');

// const httpProtocol = 'http://';
// const appDomain = '198.100.145.58';

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.job("resizePhoto", function(req, res) {
 	if(!req.params.arrPhotos || req.params.arrPhotos.length === 0) {
		res.error("Missing params or wrong format: arrPhotos");
		return;
	}
	var responseAll = [];
	var listPhotos = req.params.arrPhotos;
	function photo_repeater(i) {
		if(i < listPhotos.length) {
			if(listPhotos[i].image && listPhotos[i].image._url && listPhotos[i].objectId) {
				var query = new Parse.Query("Photos")
				query.get(listPhotos[i].objectId, {
					success: function(photo) {
						if(photo) {
							Jimp.read(photo.get('image')._url, function (err, image) {
								if(err) {
									responseAll.push(err);
									photo_repeater(i + 1);
								} else {
									image.resize(1024, Jimp.AUTO); 
									image.getBase64(Jimp.AUTO, (err, base64) => {
										if (err) {
											responseAll.push(err);
											photo_repeater(i + 1);
										} else {
											var parseFile = new Parse.File("1024." + image.getExtension(), { base64: base64 });
											parseFile.save().then(function(dataFile) {
												photo.set('thumbnail', dataFile);
												photo.save(null, {
													success: function(photoResult) {
														responseAll.push(photoResult);
														photo_repeater(i + 1);
													},
													error: function(photoResult, error) {
														responseAll.push(error);
														photo_repeater(i + 1);
													}
												});
											}, function(error) {
												rresponseAll.push(error);
												photo_repeater(i + 1);
											});
											
										}
									});
								}
							});
						} else {
							responseAll.push({code: 404, message: 'Object not found'});
							photo_repeater(i + 1);
						}
						
					},
					error: function(object, error) {
						responseAll.push(error);
						photo_repeater(i + 1);
					}
				});
			} else {
				responseAll.push({code: 404, message: 'Missing params: image, objectId'});
				photo_repeater(i + 1);
			}
			
		} else {
			res.success(responseAll);
		}
	}
	photo_repeater(0);
});


Parse.Cloud.define("createPhoto", function(req, res) {
	if(!req.params.arrPhotos || req.params.arrPhotos.length === 0) {
		res.error("Missing params or wrong format: arrPhotos");
		return;
	}
console.log(req.params.arrPhotos)
	var responseAll = [];
	var listPhotos = req.params.arrPhotos;
	function photo_repeater(i) {
		if(i < listPhotos.length) {
			if(listPhotos[i].image && listPhotos[i].image._url && listPhotos[i].user && listPhotos[i].date) {
				Jimp.read(listPhotos[i].image._url, function (err, image) {
					if(err) {
						responseAll.push(err);
						photo_repeater(i + 1);
					} else {
						image.resize(640, Jimp.AUTO)
							.quality(60); 
						image.getBase64(Jimp.AUTO, (err, base64) => {
							if (err) {
								responseAll.push(err);
								photo_repeater(i + 1);
							} else {
								var Photo = Parse.Object.extend("Photos");
								var photo = new Photo();
								photo.set('isArtwork', false);
								photo.set('user', listPhotos[i].user);
								photo.set('image', listPhotos[i].image);
								photo.set('date', listPhotos[i].date);
								var parseFile = new Parse.File("1024." + image.getExtension(), { base64: base64 });
								parseFile.save().then(function(dataFile) {
									photo.set('thumbnail', dataFile);
									photo.save(null, {
										success: function(photoResult) {
											responseAll.push(photoResult);
											photo_repeater(i + 1);
										},
										error: function(photoResult, error) {
											responseAll.push(error);
											photo_repeater(i + 1);
										}
									});
								}, function(error) {
									rresponseAll.push(error);
									photo_repeater(i + 1);
								});
								
							}
						});
					}
				});
			} else {
				responseAll.push({code: 404, message: 'Missing params: image, user, date'});
				photo_repeater(i + 1);
			}
			
		} else {
			res.success(responseAll);
		}
	}
	photo_repeater(0);
});

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

Parse.Cloud.define("stripeCharge", function(request, response) {
  if (!request.user) {
    response.error("Must be signed in to call this Cloud Function.")
    return;
  }

  // Check params
  // if (!request.params.stripeCustomer) {
  //   response.error("Missing objectId");
  //   return;
  // }

  if(!request.params.token) {
    response.error("Missing 'token'");
    return;
  }

  if(!request.params.amount) {
    response.error("Missing 'amount'");
    return;
  }

  // if(!request.params.address) {
  //   response.error("Missing 'address'");
  //   return;
  // }
  
  if(!request.params.detail) {
    response.error("Missing 'detail'");
    return;
  }

  // Charge the user's card:
  var charge = stripe.charges.create({
    amount: request.params.amount * 100,
    currency: "aud",
    description: "Payment from user #" + request.user.id,
    metadata: request.params.detail,
    capture: true,
    source: request.params.token
    // customer: request.params.stripeCustomer,
  }, function(err, charge) {
    // asynchronously called
    if (!err) {
      response.success(charge);
    } else {
      response.error(err);
    }
  });

});

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
