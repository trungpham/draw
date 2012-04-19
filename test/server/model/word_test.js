var Word = require(process.cwd()+'/server/model/word');

describe('Model.Word', function(){

     describe('getRandomWordSet', function(){

         before(function(done){

             async.forEach([
                 'a','b','c','d','e', 'f'
             ],
             function(item, cb){


                 async.parallel([
                     function(cb){
                         var wordEasy = new Word({
                             value: 'wordeasy' + item,
                             difficulty: 'easy',
                             locale: 'en_US'
                         });
                          wordEasy.save(cb);

                     }, function(cb){
                         var wordMedium = new Word({
                             value: 'wordmedium' + item,
                             difficulty: 'medium',
                             locale: 'en_US'
                         });
                          wordMedium.save(cb);

                     },
                     function(cb){
                         var wordHard = new Word({
                             value: 'wordhard' + item,
                             difficulty: 'hard',
                             locale: 'en_US'
                         });
                         wordHard.save(cb);
                     }
                 ], function(err, results){
                    cb();

                 })
             },
             function(err, results){
                done();
             });
         });
        it('should grab an easy, medium, hard words at random', function(done){

            Word.getRandomWordSet(function(err, words){
                expect(words.length).to.eql(3);
                expect(words[0].difficulty).to.eql('easy');
                expect(words[1].difficulty).to.eql('medium');
                expect(words[2].difficulty).to.eql('hard');
                done();
            });
        });

     });
});