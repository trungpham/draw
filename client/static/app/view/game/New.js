Ext.define("D.view.game.New", {
    id:'newGameView',
    extend:'Ext.Container',
    config: {
        layout: 'vbox',
        items: [
            {
                id: 'canvas',
                xtype: 'container',
                html: '<canvas width="640" height="640" id="new-drawing-canvas"></canvas>'


            },{
                id: 'submitDrawing',
                xtype: 'button',
                text: 'Done'
            }
        ],
        control: {
            'button': {
                tap: 'onSubmitDrawing'
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
        debugger
        this.fireEvent('submit', this.params.game, this.params.drawing);
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
    }

});