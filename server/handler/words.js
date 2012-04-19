var Word = require(process.cwd()+'/server/model/word');

module.exports = {

    list: function(req, res){

        Word.getRandomWordSet(function(err, results){
            res.json(results);
        });

    }

};