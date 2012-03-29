Ext.define('D.model.ExternalFriend', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'source', type: 'string'}
        ],
        belongsTo: {
            model: 'D.model.User', name: 'user'
        }

    }
});