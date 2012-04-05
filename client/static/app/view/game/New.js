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
                html: '<canvas width="640" height="640" id="new-drawing-canvas"></canvas>'
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
            this.penSizeSelector = Ext.create('Ext.Panel', {
                id:'penSizeSelector',
                xtype:'panel',
                data:['tiny', 'small', 'medium', 'large'],
                tpl:'<tpl for="."><div class="size-select"><div class="full-circle size-select-{.}"></div></div></tpl>',
                //modal:true,
                width:50,
                height:164,
                //hideOnMaskTap:true,
                listeners:{
                    tap:function () {
                        console.log('tag');
                    },
                    painted: function(){
                        var el = Ext.get(this.getId());
                        el.on('tap', function(){
                            console.log(arguments);
                        })
                    },
                    click:function () {
                                            console.log('tag');
                }
                }
            });
        }


//        this.penSizeSelector.on('tap', function(){
//            console.log(arguments);
//        });

        this.penSizeSelector.showBy(this.query('#pen')[0]);
    },
    onEraser: function(e){

        this.query('#penSizeSelector')
            debugger
    }

});