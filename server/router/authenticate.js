exports.facebook = {
        signedRequest: function(req, res){
            var SignedRequest = require('../lib/fb_signed_request');
            var config = require('../../config.js');
            var mongoose = require('mongoose');
            require('../model/user.js');
            var User = mongoose.model('User');
            SignedRequest.secret = config.facebook.appSecret;
            var signedRequest = new SignedRequest(req.body.signedRequest);

            signedRequest.parse(function(errors, request){
              // check if request was valid
              if (request.isValid()){
                  //sign the user in if user exists
                  User.findOne({'identities.source': 'fb', 'identities.id': request.data['user_id']}, function(err, user){

                    console.log(user);

                      //if user does not exist
                    if (!user){
                        var rest = require('restler');
                        rest.get('https://graph.facebook.com/'+request.data['user_id'] +'/?access_token='+req.body.accessToken, {
                            parser: rest.parsers.json
                        }).on('complete', function(result) {

                                //create the user
                                var user = new User({
                                    firstName: result.first_name,
                                    lastName: result.last_name,
                                    name: result.name,
                                    email: result.email
                                });
                                user.identities.push({
                                    source: 'fb',
                                    id: result.id,
                                    data: result
                                });

                                user.save(function (err) {
                                  if (!err){
                                        res.end(user.toAuthableJSON());
                                        console.log('saved user');
                                    }
                                });

                        });

                        console.log('user does not exist');
                    }else{
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(user.toAuthableJSON()));
                    }
                  });


              }
            });
        }
};