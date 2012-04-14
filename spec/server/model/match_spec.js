

describe('Model.Match', function(){

    var user = new User({
        name: 'trung',
        identities: [{


        }]

    });
    beforeEach(function(){
        User.collection.drop();


        createMatchFor();


    });

    describe('prepareForUser', function(){

        it('should', function(){

            expect(true).toEqual(false);
        })

    });

});