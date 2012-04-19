Ext.define('D.view.game.Guess', {
    extend:'Ext.Container',
    requires: ['D.lib.Math', 'D.view.drawing.Player'],
    config:{
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
                    },

                    {
                        xtype: 'button',
                        id: 'give-up-button',
                        text: 'Give up',
                        docked: 'right'

                    }
                ]
            },
            {  centered: true,
                xtype: 'drawingplayer'
            },
            {
                xtype: 'container',
                docked: 'bottom',
                layout: 'vbox',
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
            initialize:function () {

                //attach the drawing to the drawing player
                var drawingPlayerView = this.child('drawingplayer');

                var guess = this.getRecord();
                drawingPlayerView.setRecord(guess.getDrawing());


                drawingPlayerView.on('playback.move', guess.setCurrentAction, guess); //record the drawing action

                var _this = this;
                var i;
                for (i = 0; i < this.getRecord().get('word_length'); i++) {
                    Ext.getCmp('guessRow').add({
                        id: 'game-board-1-' + i,
                        xtype:'component',
                        cls:'slot',
                        data: {row: 1, col: i},
                        width:26,
                        height:26,
                        margin:4,
                        listeners:{

                            painted:function () {
                                //set up tap listener here
                            }
                        }
                    });
                }

                Ext.Array.each(this.getRecord().get('letters'), function (letter, index) {
                    //add some hidden place holder
                    Ext.getCmp('lettersRow').add({
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
                            renderTo: Ext.Viewport.element,
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
                            },
                            draggable:{
                                constraint:null,
                                direction:'both',
                                listeners:{
                                    drag:function (draggable, e, x, y) {

                                    },
                                    dragstart:function () {

                                    },
                                    dragend:function (draggable, e, x, y) {


                                        var letterElement = draggable.getElement();
                                        var dropped = false;
                                        Ext.select('.slot').each(function(el, c, index){

                                            var distance = D.lib.Math.distance(el.getXY(), letterElement.getXY());

                                            if (distance < 10){
                                                var slotCmp = Ext.getCmp(el.getId());
                                                var slotPosition = [slotCmp.getData().row, slotCmp.getData().col];
                                                var letterCmp = Ext.getCmp(letterElement.getId());


                                                try{
                                                    _this.getRecord().move(letterCmp.getData().letterIndex, slotPosition);
                                                    letterElement.setXY(el.getXY());
                                                    dropped = true;
                                                }catch(e){
                                                    console.log(e);
                                                }
                                            }
                                        });

                                        Ext.select('.letterHolder').each(function(el, c, index){
                                            var distance = D.lib.Math.distance(el.getXY(), letterElement.getXY());

                                                  if (distance < 10){

                                                      var holderCmp = Ext.getCmp(el.getId());
                                                      var holderPosition = [holderCmp.getData().row, holderCmp.getData().col];
                                                      var letterCmp = Ext.getCmp(letterElement.getId());
                                                      try{
                                                          _this.getRecord().move(letterCmp.getData().letterIndex, holderPosition);
                                                          letterElement.setXY(el.getXY());
                                                          dropped = true;
                                                      }catch(e){
                                                          console.log(e);
                                                      }


                                                  }
                                        });

                                        //if dropped is false then we need to roll back to the start
                                        if (!dropped){

                                            var cmp = Ext.getCmp(letterElement.getId());

                                            var currentPosition = _this.getRecord().getPosition(cmp.getData().letterIndex);

                                            //console.log(currentPosition);

                                            var currentSlot = Ext.get('game-board-'+currentPosition.row+'-'+currentPosition.col);

                                            letterElement.setXY(currentSlot.getXY());
                                        }
                                    }
                                }
                            }
                        }
                    )

                });

            },
            painted: function(){
                //move the letters to the starting positions
                Ext.select('.letterHolder').each(function(el, c, index){

                    Ext.get('letter-'+index).setXY(el.getXY()).show();
                });

                var drawingPlayerView = this.child('drawingplayer');
                drawingPlayerView.play();

                var skipButton = this.down('#skip-button');
                skipButton.on('tap', function(){
                    this.disable();
                    drawingPlayerView.skip();
                });

                var giveUpButton = this.down('#give-up-button');
                giveUpButton.on('tap', function(){
                    Ext.Msg.confirm('Give up', 'End your streak and start over?', function(buttonId){

                        if (buttonId === 'yes'){
                            this.fireEvent('guess.giveup');
                        }

                    }, this);
                })
            }
        }
    }


});