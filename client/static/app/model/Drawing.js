Ext.define('D.model.Drawing',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id', type: 'string'
            },
            {
                name: 'createdTime', type: 'int'
            },
            {
                name: 'data', type: 'auto'
            }
        ],
        belongsTo:[
            {
                name: 'drawer', model: 'D.model.User'
            },
            {
                name: 'game', model: 'D.model.Game'
            },
            {
                name: 'word', model: 'D.model.Word'
            }
        ],
        hasOne: [
            {
                name: 'guess', model: 'D.model.Guess'
            }
        ]

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
    record:function (opts) {
        switch (opts.action) {
            case 'pen':
                this.get('data').push([
                    'p',
                    this.calOffset(),
                    opts.startX,
                    opts.startY,
                    opts.endX,
                    opts.endY
                ]);
                break;
            case 'dot':
                this.get('data').push([
                    'd',
                    this.calOffset(),
                    opts.x,
                    opts.y
                ]);
                break;
            case 'erase':
                this.get('data').push([
                    'e',
                    this.calOffset(),
                    opts.startX,
                    opts.startY,
                    opts.endX,
                    opts.endY
                ]);
                break;
            case 'clear':
                this.get('data').push([
                    'clear',
                    this.calOffset()
                ]);
                break;
            case 'penSize':
                this.get('data').push([
                    'penSize',
                    this.calOffset(),
                    opts.size
                ]);
                break;
            case 'penColor':
                this.get('data').push([
                    'penColor',
                    this.calOffset(),
                    opts.color
                ]);
                break;
            case 'eraseSize':
                this.get('data').push([
                    'eraseSize',
                    this.calOffset(),
                    opts.size
                ]);
                break;

        }
    },
    /**
     *  calculate the offset
     *  @return {number}
     */
    calOffset: function(){
        return (new Date()).getTime() - this.get('createdTime');
    }
});