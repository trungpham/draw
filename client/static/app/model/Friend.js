Ext.define('D.model.Friend', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' }
        ],
        belongsTo: {
            model: 'D.model.User', name: 'user'
        }

    }
});