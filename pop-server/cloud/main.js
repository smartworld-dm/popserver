'use strict'
require('./users');
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

// Stripe functions
Parse.Cloud.define("stripeCharge", stripe.stripeCharge)
Parse.Cloud.define('getCards', stripe.getCards)

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

Parse.Cloud.job("resizePhoto", function(req, res) {
 	if(!req.params.arrPhotos || req.params.arrPhotos.length === 0) {
		res.error("Missing params or wrong format: arrPhotos");
		return;
	}
	var responseAll = [];
	var listPhotos = req.params.arrPhotos;
	function photo_repeater(i) {
		if(i < listPhotos.length) {
			if(listPhotos[i].objectId) {
				var query = new Parse.Query("Photos")
				query.get(listPhotos[i].objectId, {
					success: function(photo) {
						if(photo) {
							Jimp.read(photo.get('image')._url, function (err, image) {
								if(err) {
									responseAll.push(err);
									photo_repeater(i + 1);
								} else {
									image.resize(640, Jimp.AUTO).quality(60);
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
