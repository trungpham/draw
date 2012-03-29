Ext.define('D.model.Word',{
    extend: 'Ext.data.Model',
    config: {
        fields: [{
                name: 'id', type: 'string'}
            ,{
                name: 'value', type: 'string'
        },
            {
                name: 'difficulty', type: 'string'
            }
        ]
    }
});