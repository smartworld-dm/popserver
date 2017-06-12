// const stripeTestSecretKey = "sk_test_7W4PxkFfDCvbcRqRLRipss39";
// const stripeTestPublicKey = "pk_test_zUUsFqn6eVqbCISVHMG9d7hY";
// const Bitly = require('bitly');

// const stripe = require("stripe")(stripeTestSecretKey);
// const bitly = new Bitly('752ea5696163f4d88160bc4a008166d60183d9ef');

// const httpProtocol = 'http://';
// const appDomain = '198.100.145.58';

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

// Parse.Cloud.define("stripeCharge", function(request, response) {
//   if (!request.user) {
//     response.error("Must be signed in to call this Cloud Function.")
//     return;
//   }

//   // Check params
//   if (!request.params.stripeCustomer) {
//     response.error("Missing objectId");
//     return;
//   }

//   if(!request.params.amount) {
//     response.error("Missing amount");
//     return;
//   }

//   if(!request.params.address) {
//     response.error("Missing address");
//     return;
//   }

//   // Charge the user's card:
//   var charge = stripe.charges.create({
//     amount: request.params.amount * 100,
//     currency: "eur",
//     description: "Payment from user #" + request.user.id,
//     metadata: {
//       address: request.params.address
//     },
//     capture: true,
//     customer: request.params.stripeCustomer,
//   }, function(err, charge) {
//     // asynchronously called
//     if (!err) {
//       response.success(charge);
//     } else {
//       response.error(err);
//     }
//   });

// });

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