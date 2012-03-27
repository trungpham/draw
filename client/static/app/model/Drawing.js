Ext.define('D.model.Drawing',{
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'startTime', type: 'int'},
            {name: 'data', type: 'auto'
        }]
    },
    init: function(){
        if (!this.get('startTime')){
            this.set('startTime', (new Date()).getTime());
        }
        this.set('data', []);
    },
    /**
     * record the user action on this drawing
     * @param {object} opts
     */
    record: function(opts){
        if (opts.action == 'stroke'){
            this.get('data').push([
                's',
                this.calOffset(),
                opts.startX,
                opts.startY,
                opts.endX,
                opts.endY,
                opts.size,
                opts.color
            ]);
        }else if (opts.action == 'erase'){
                    this.get('data').push([
                        'e',
                        this.calOffset(),
                        opts.startX,
                        opts.startY,
                        opts.endX,
                        opts.endY,
                        opts.size
                    ]);
        }else if (opts.action == 'clear'){
            this.get('data').push([
                'c',
                this.calOffset()
            ]);
        }
    },
    /**
     *  calculate the offset
     *  @return {number}
     */
    calOffset: function(){
        return (new Date()).getTime() - this.get('startTime') || 0;
    }
});