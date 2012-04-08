Ext.define('D.view.game.Guess', {
    extend:'Ext.Container',
    requires: 'D.lib.Math',
    config:{
        layout:'vbox',
        items:[
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
        ],
        listeners:{
            initialize:function () {
                var _this = this;
                var i;
                for (i = 0; i < this.getRecord().get('wordLength'); i++) {
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
                    _this.add(
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
                            },
                            draggable:{
                                constraint:null,
                                direction:'both',
                                listeners:{
                                    drag:function (draggable, e, x, y) {
                                        console.log(arguments)
                                        //     console.log(x);
                                        //console.log(y);
                                        //console.log(e.target);
                                    },
                                    dragstart:function () {
                                        console.log(this)
                                        console.log(arguments)
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
            }
        }
    }


});