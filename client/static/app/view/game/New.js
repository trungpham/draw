Ext.define("D.view.game.New", {
    id:'newGameView',
    extend:'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'container',
                html: 'You are drawing {word} for ${friend}'
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'panel',
                        data: {value: 'blue'},
                        tpl: '{value}'
                    }
                ]
            },
            {
                id: 'canvas',
                xtype: 'container',
                html: '<canvas width="320" height="320" id="new-drawing-canvas"></canvas>'
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
                this.fireEvent('submit', this.params.game, this.params.drawing);
            }
        }, this);
    },
    onShow: function(){
        var element = this.query('container#canvas')[0].element;
        element.on('touchstart', this.onCanvasTouchStart, this); //this get fired first
        element.on('touchmove', this.onCanvasTouchMove, this); //this will get fired if the user moves the mouse
        element.on('tap', this.onCanvasTap, this); //this will get fired of the user clicks and lets go right away
        this.canvas = document.getElementById('new-drawing-canvas');
        this.context = this.canvas.getContext('2d');
        this.context.lineWidth = 2;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
    },
    onCanvasTouchStart: function(e){
        this.context.beginPath();
        this.context.moveTo(e.pageX, e.pageY);
        this.lastX = e.pageX;
        this.lastY = e.pageY;
    },
    onCanvasTap: function(e){

    },
    onCanvasTouchMove: function(e){
        this.context.lineTo(e.pageX, e.pageY);
        this.context.stroke();
        this.params.drawing.record({
            action: 'pen',
            startX: this.lastX,
            startY: this.lastY,
            endX: e.pageX,
            endY: e.pageY
        });
        this.lastX = e.pageX;
        this.lastY = e.pageY;
    },
    onPen: function(e){
        //create if not there yet

        if (!this.penSizeSelector) {
            this.penSizeSelector = Ext.create('D.view.SizeSelector');

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
            this.eraserSizeSelector = Ext.create('D.view.SizeSelector');
        }
        this.eraserSizeSelector.showBy(this.query('#eraser')[0]);
    }

});