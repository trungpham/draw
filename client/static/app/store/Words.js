Ext.define('D.store.Words', {
    extend: 'Ext.data.Store',
    requires: 'D.model.Word',
    config: {
        model: 'D.model.Word'
    }
});