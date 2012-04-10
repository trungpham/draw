Ext.define('D.view.game.PlayBack', {
    extend: 'Ext.Container',
    requires: ['D.view.drawing.Player'],
    config: {
        layout:'vbox',
        items:[
            {
                docked: 'top',
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        id: 'skip-button',
                        text: 'Skip',
                        docked: 'left'
                    }
                ]
            },
            {
                centered: true,
                xtype: 'drawingplayer'
            },
            {
                xtype: 'container',
                docked: 'bottom',
                items: [
                    {
                        xtype:'container',
                        id:'guessRow',
                        cls:'game-board',
                        layout:{
                            type:'hbox',
                            align:'middle',
                            pack:'center'
                        }
                    },
                    {
                        xtype:'container',
                        id:'lettersRow',
                        layout:{
                            type:'hbox',
                            align:'middle',
                            pack:'center'
                        }
                    }
                ]

            }

        ],

        listeners:{
            initialize: function(){

                //attach the drawing to the drawing player
                var drawingPlayerView = this.child('drawingplayer');

                var guess = this.getRecord();
                drawingPlayerView.setRecord(guess.getDrawing());

                drawingPlayerView.on('playback.move', this.processMoves, this); //record the drawing action

                var _this = this;
                var i;
                for (i = 0; i < this.getRecord().get('wordLength'); i++) {
                    _this.down('#guessRow').add({
                        id: 'game-board-1-' + i,
                        xtype:'component',
                        cls:'slot',
                        data: {row: 1, col: i},
                        width:26,
                        height:26,
                        margin:4

                    });
                }


                Ext.Array.each(this.getRecord().get('letters'), function (letter, index) {
                    //add some hidden place holder
                    _this.down('#lettersRow').add({
                        id: 'game-board-0-' + index,
                        data: {row: 0, col: index},
                        cls: 'letterHolder',
                        xtype:'component',
                        width:26,
                        height:26,
                        margin:4

                    });
                    Ext.Viewport.add(
                        {
                            id: 'letter-'+index,
                            style:'position: absolute;',
                            width:26,
                            height:26,
                            hidden: true,
                            cls:'letter',
                            xtype:'component',
                            html:letter,
                            data: {
                                letterIndex: index
                            }
                        });
                });

            },

            painted: function(){
                Ext.select('.letterHolder').each(function(el, c, index){

                    Ext.get('letter-'+index).setXY(el.getXY()).show();

                });
                var drawingPlayerView = this.child('drawingplayer');
                drawingPlayerView.play();

                var skipButton = this.down('#skip-button');
                skipButton.on('tap', function(){

                    drawingPlayerView.skip();
                });
            }

        }
    },

    processMoves: function(actionIndex){
        var i;
        var data = this.getRecord().get('data')[actionIndex];
        if (data){
            for (i=0; i< data.length; i++){
                this._doMove(data[i]);
            }
        }
    },
    _doMove: function(move){
        var moveDump = move.split('-');

        switch (moveDump[0]){
            case 'm':
                this._moveLetter(moveDump[2], moveDump[3], moveDump[4]);

        }
    },
    _moveLetter: function(letter, row, col){
        Ext.get('letter-'+letter).setXY(Ext.get('game-board-'+row+'-'+col).getXY());
    }

});