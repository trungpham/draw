Ext.define("Draw.view.game.New", {
    id:'newGameView',
    requires: ['Draw.view.Canvas'],
    extend:'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'vbox',
        items: [
            {
                docked: 'top',
                xtype: 'container',
                html: 'You are drawing {word} for ${friend}'
            },

            {   centered: true,
                xtype: 'canvas'
            },

            {
                docked: 'bottom',
                layout: 'hbox',
                xtype: 'toolbar',
                items: [
                    {
                        id: 'pen',
                        xtype: 'button',
                        iconCls: 'compose1',
                        iconMask: 'true'
                    },
                    {
                        id: 'eraser',
                        xtype: 'button',
                        iconCls: 'eraser',
                        iconMask: 'true'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'trash2',
                        iconMask: 'true'
                    },
                    {
                        id: 'submit',
                        xtype: 'button',
                        text: 'Done'
                    }

                ]
            }
        ],
        control: {
            'button#submit': {
                tap: 'onSubmitDrawing'
            },
            'button#pen':{
                tap: 'onPen'
            },
            'button#eraser': {
                tap: 'onEraser'
            }
        },
        listeners: {
            show: 'onShow'
        }
    },

    //sets up our tap event listener
    initialize: function() {
        this.callParent(arguments);
    },
    onSubmitDrawing: function(){
        Ext.Msg.confirm('Confirmation', 'Send this picture to your friend?', function(buttonId, value, opts){
            if (buttonId === 'yes'){
                this.fireEvent('submit', {drawing: this.getData().drawing,
                    friend: this.getData().friend,
                    word: this.getData().word

                });
            }
        }, this);
    },
    onShow: function(){
        var element = this.child('canvas').element;
        element.on('touchstart', this.onCanvasTouchStart, this); //this get fired first
        element.on('touchmove', this.onCanvasTouchMove, this); //this will get fired if the user moves the mouse
        element.on('tap', this.onCanvasTap, this); //this will get fired of the user clicks and lets go right away
        element.on('dragend', this.onCanvasDragEnd, this); //when user lifts up the finger
        this.canvas = element.down('canvas', true); //return the actual canvas dom
        this.canvasXY = Ext.get(this.canvas).getXY();
        this.context = this.canvas.getContext('2d');
        this.context.lineWidth = 2;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
    },
    onCanvasTouchStart: function(e){
        this.context.beginPath();
        var x = e.pageX - this.canvasXY[0];
        var y = e.pageY - this.canvasXY[1];
        this.context.moveTo(x, y);
        this.lastX = x;
        this.lastY = y;
    },
    onCanvasTap: function(e){

    },
    onCanvasDragEnd: function(e){
        this.context.closePath();
    },
    onCanvasTouchMove: function(e){
        var x = e.pageX - this.canvasXY[0];
        var y = e.pageY - this.canvasXY[1];
        this.context.lineTo(x, y);
        this.context.stroke();
        this.getData().drawing.record({
            action: 'pen',
            startX: this.lastX,
            startY: this.lastY,
            endX: x,
            endY: y
        });
        this.lastX = x;
        this.lastY = y;
    },
    onPen: function(e){
        //create if not there yet

        if (!this.penSizeSelector) {
            this.penSizeSelector = Ext.create('Draw.view.SizeSelector');

//            this.penSizeSelector = Ext.create('Ext.Panel', {
//                id:'penSizeSelector',
//                xtype:'panel',
//                data:['tiny', 'small', 'medium', 'large'],
//                tpl:'<tpl for="."><div class="size-select" data-size="{.}"><div data-size="{.}" class="full-circle size-select-{.}"></div></div></tpl>',
//                modal:true,
//                width:50,
//                height:164,
//                hideOnMaskTap:true,
//                currentSize: 'tiny',
//                listeners:{
//                    painted: function(){
//
//                        var _this = this;
//                        _this.element.select('.size-select[data-size="'+this.currentSize+'"]').addCls('size-select-active');
//
//                        this.element.on('tap', function(e, node){
//                            //add the active class
//                            var size = node.getAttribute('data-size');
//
//
//                            //is this already active?
//                            if (size != _this.currentSize){
//                                _this.currentSize = size;
//
//                                //remove the other active
//                                _this.element.select('.size-select-active').toggleCls('size-select-active');
//
//                                var dom = _this.element.query('.size-select[data-size="'+size+'"]')[0];
//                                Ext.get(dom).addCls('size-select-active');
//
//                                _this.fireEvent('sizeChanged', size);
//                            }
//
//                            _this.hide();
//
//                        })
//                    }
//                }
//            });
        }
        this.penSizeSelector.showBy(this.query('#pen')[0]);
    },
    onEraser: function(e){
        if (!this.eraserSizeSelector) {
            this.eraserSizeSelector = Ext.create('Draw.view.SizeSelector');
        }
        this.eraserSizeSelector.showBy(this.query('#eraser')[0]);
    }

});