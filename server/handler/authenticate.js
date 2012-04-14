var createMatchFromPendingDrawing = function(){

};

var signUserInAndResponse = function(req, res, user){
    req.session.userId = user.id;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user.toAuthableJSON()));
};

module.exports = {
    fbSignedRequest:function (req, res) {
        var SignedRequest = require(process.cwd() + '/server/lib/fb_signed_request');
        var config = require(process.cwd() + '/config.js');

        var User = require(process.cwd() + '/server/model/user');

        SignedRequest.secret = config.facebook.appSecret;
        var signedRequest = new SignedRequest(req.body.signedRequest);


        signedRequest.parse(function (errors, request) {
            // check if request was valid
            if (request.isValid()) {
                //sign the user in if user exists
                User.findOne({'identities.source':'fb', 'identities.xid':request.data['user_id']}, function (err, user) {

                    //if user does not exist
                    if (!user) {
                        var rest = require('restler');
                        rest.get('https://graph.facebook.com/' + request.data['user_id'] + '/?access_token=' + req.body.accessToken, {
                            parser:rest.parsers.json
                        }).on('complete', function (result) {

                                //create the user
                                var user = new User({
                                    firstName:result.first_name,
                                    lastName:result.last_name,
                                    name:result.name,
                                    email:result.email
                                });
                                user.identities.push({
                                    source:'fb',
                                    xid:result.id,
                                    data:result
                                });

                                user.save(function (err) {
                                    if (!err) {
                                        signUserInAndResponse(req, res, user);
                                    }
                                });

                            });
                    } else {
                        signUserInAndResponse(req, res, user);
                    }
                });


            }
        });
    }
};