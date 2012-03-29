Ext.define('D.model.Guess', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'data'
            },
            {
                name: 'startTime', type: 'int'
            },
            {
                name: 'letters'
                /**
                    the letter arrays we start out with. like 'WORLD' with other random letters
                    W, O, R, L, X, D
                    U, I, O, W, K, N
                **/
            },
            {
                name: 'wordLength', type: 'int'
            }
        ],
        belongsTo: [
            {
                name: 'drawing', model: 'D.model.Drawing'
            },
            {
                name: 'word', model: 'D.model.Word'
            }
        ]
    },
    init: function(){
        this.set('data', []); //default to an empty array

        //set the game board
        this.gameBoard = [
            [], //randome letters
            new Array(this.get('wordLength'))  //guessing area
        ];

        this.gameLetters = [];
        var i;
        var letters = this.get('letters');
        for(i = 0; i< this.get('letters').length; i++){
            this.gameBoard[0][i] = i;
            this.gameLetters[i] = {
                                        value: letters[i],
                                        row: 0,
                                        col: i
                                   };
        }

    },
    move: function(letter, coordinates){
        if (this.gameBoard[coordinates[0]][coordinates[1]] != undefined){
            throw 'Colliding move';
        }
        if (coordinates[0] === 0){
            //first row
            if (coordinates[1] < 0 || coordinates[1] >= this.gameBoard[0].length){
                throw 'Out of bound move';
            }

        }else if(coordinates[0] === 1 ){
            //second row
            if (coordinates[1] < 0 || coordinates[1] >= this.get('wordLength')){
                throw 'Out of bound move';
            }
        }else{
            throw 'Out of bound move';
        }

        this.gameBoard[this.gameLetters[letter].row][this.gameLetters[letter].col] = undefined;
        this.get('data').push(['m', this.calOffset(), letter, coordinates[0], coordinates[1]]);
        this.gameBoard[coordinates[0]][coordinates[1]] = letter;
        this.gameLetters[letter].row = coordinates[0];
        this.gameLetters[letter].col = coordinates[1];
    },
    /**
     *  calculate the offset
     *  @return {number}
     */
    calOffset: function(){
        return (new Date()).getTime() - this.get('startTime');
    },
    shuffle: function(){

    }
});