Ext.define('Draw.model.ExternalFriend', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'source', type: 'string'},
            { name: 'xid', type: 'string'}
        ]
    }
});