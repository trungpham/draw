//this view will play back the raw drawing
Ext.define('D.view.drawing.Player', {
    extend: 'Ext.Container',
    xtype: 'drawingplayer',
    config: {
        items:[
            {
                xtype:'canvas'
            }
        ],
        listeners: {
            painted: function(){
                this.canvas = this.element.down('canvas', true);
                this.context = this.canvas.getContext('2d');
                this.context.lineWidth = 2;
                this.context.lineCap = "round";
                this.context.lineJoin = "round";
            }
        }
    },
    statics: {
        DRAW_INTERVAL: 250 //pause 10 milliseconds between each action
    },
    /**
     * this function will play back the drawing
     */
    play: function(){
        this.drawingData = this.getRecord().get('data');
        this.currentIndex = 0;
        this._drawLoop(this);
    },
    /**
     * fast word the drawing
     */
    skip: function(){
        this._skipped = true;
    },
    _drawLoop: function(scope){

        scope._draw(scope.drawingData[scope.currentIndex]);

        scope.currentIndex++;

        if (scope.currentIndex < scope.drawingData.length){
            //buffer the next action
            if (scope._skipped){
                scope._drawLoop(scope);
            }else{
                setTimeout(scope._drawLoop, scope.self.DRAW_INTERVAL, scope);
            }
        }


    },
    _drawStroke: function(x1, y1, x2, y2){
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();
    },
    _draw: function(action){
        var actionDump = action.split('-');

        switch(actionDump[0]){
            case 'p':
                this._drawStroke(actionDump[2], actionDump[3], actionDump[4], actionDump[5]);
                break;
        }
        this.fireEvent('playback.move', this.currentIndex);
    }
});