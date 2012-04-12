Ext.define('D.model.Identity', {
    extend: 'Ext.data.Model',
    proxy: {
            type: 'rest',
            url: 'identities',
            format: 'json'
    },
    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'external_id'
            },
            {
                name: 'source'
            },{
                name: 'name'
            }
        ]
    }
});