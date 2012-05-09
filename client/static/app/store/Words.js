Ext.define('Draw.store.Words', {
    extend: 'Ext.data.Store',
    requires: 'Draw.model.Word',
    config: {
        model: 'Draw.model.Word'
    }
});