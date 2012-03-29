describe('D.model.Guess', function(){
    var guess;
    beforeEach(function(){
        guess = Ext.create('D.model.Guess', {
                                                startTime: (new Date()).getTime(),
                                                wordLength: 5,
                                                letters: ['A', 'B', 'C', 'D', 'E', 'F',
                                                          'G', 'H', 'I', 'J', 'K', 'L'
                                ]});

        var fakeTime = (new Date());
        spyOn(fakeTime, 'getTime').andReturn(guess.get('startTime')+10);
        spyOn(window, 'Date').andReturn(fakeTime);

    });
    it('should record the movement of letters', function(){
        expect(function(){
            expect(guess.gameBoard[1][1]).not.toBeDefined();
            guess.move(0, [1,1]) //move letter A to the 2nd spot in the guess box
            expect(guess.get('data')).toEqual([['m', 10, 0, 1, 1]]);
            expect(guess.gameBoard[1][1]).toEqual(0);
        }).not.toThrow();
        expect(function(){
            expect(guess.gameBoard[0][0]).not.toBeDefined();
            guess.move(1, [0,0]) //move letter B to where A used to be
            expect(guess.get('data')).toEqual([['m', 10, 0, 1, 1],['m', 10, 1, 0, 0]]);
            expect(guess.gameBoard[0][0]).toEqual(1);
        }).not.toThrow();

    });

    it('should not allow moving two letters to the same position', function(){
        guess.move(0, [1,1]);
        expect(function(){
            guess.move(1, [1,1]);
        }).toThrow('Colliding move');

    });

    it('should not allow out of the bound move', function(){
        expect(function(){
            guess.move(1, [1,5]);
        }).toThrow('Out of bound move');
        expect(function(){
            guess.move(1, [0,12]);
        }).toThrow('Out of bound move');
    });


    it('should record shuffle event', function(){
        guess.shuffle()
    });

    it('should record reset event', function(){

    });

    it('should clear out some of the words', function(){

    });
});