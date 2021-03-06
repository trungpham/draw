var Guess = require(process.cwd()+'/server/model/guess');


module.exports = {

    check: function(req, res){
        Guess.findById(req.body.id, function(err, guess){

            if (guess){

                guess.verify(req.body.letters, function(err, result){

                    res.json({status: result});

                });

            }

        });
    },
    record: function(req, res){

        Guess.findById(req.params.id, function(err, guess){

            if (guess){

                guess.record(req.body.data, function(err, result){

                    res.json({status: 'SUCCESS'});

                });

            }

        });

    }

};