Ext.define('Draw.model.Drawing',{
    extend: 'Ext.data.Model',
    config: {
        proxy: {
                type: 'rest',
                url : 'drawings',
                format: 'json',
                writer: Ext.create('Draw.lib.DeepJsonWriter')
        },

        fields: [
            {
                name: 'id', type: 'string'
            },
            {
                name: 'created_time', type: 'int'
            },
            {
                name: 'start_time', type: 'int'
            },
            {
                name: 'data', type: 'auto'
            },
            {
                name: 'match_id'
            },
            {
                name: 'word_id'
            },
            {
                name: 'identity_id'
            }
        ],
        belongsTo:[
            {
                name: 'drawer', model: 'Draw.model.User'
            },
            {
                name: 'match', model: 'Draw.model.Match'
            },
            {
                name: 'word', model: 'Draw.model.Word'
            }
        ],
        hasOne: [
            {
                name: 'guess', model: 'Draw.model.Guess'
            },
            {
                name: 'external_friend', model: 'Draw.model.ExternalFriend'
            }
        ]

    },
    init: function(){
        if (!this.get('start_time')){
            this.set('start_time', (new Date()).getTime());
        }
        if (!this.get('data')){
            this.set('data', []);
        }
    },
    /**
     * record the user action on this drawing
     * @param {object} opts
     */
    record:function (opts) {
        switch (opts.action) {
            case 'pen':
                this.get('data').push(
                    'p-'+
                    this.calOffset() + '-' +
                    opts.startX + '-' +
                    opts.startY + '-' +
                    opts.endX + '-' +
                    opts.endY
                );
                break;
            case 'dot':
                this.get('data').push(
                    'd-'+
                    this.calOffset()+'-'+
                    opts.x + '-' +
                    opts.y
                );
                break;
            case 'erase':
                this.get('data').push(
                    'e-'+
                    this.calOffset() + '-' +
                    opts.startX + '-' +
                    opts.startY + '-' +
                    opts.endX + '-' +
                    opts.endY
                );
                break;
            case 'clear':
                this.get('data').push(
                    'clear-' +
                    this.calOffset()
                );
                break;
            case 'penSize':
                this.get('data').push(
                    'penSize-' +
                    this.calOffset() + '-' +
                    opts.size
                );
                break;
            case 'penColor':
                this.get('data').push(
                    'penColor-' +
                    this.calOffset() + '-' +
                    opts.color
                );
                break;
            case 'eraseSize':
                this.get('data').push(
                    'eraseSize-' +
                    this.calOffset() +'-'+
                    opts.size
                );
                break;

        }
    },
    /**
     *  calculate the offset
     *  @return {number}
     */
    calOffset: function(){
        return (new Date()).getTime() - this.get('start_time');
    }
});