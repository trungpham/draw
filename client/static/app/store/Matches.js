Ext.define('D.store.Matches', {
    requires: ['D.model.Match'],
    extend: 'Ext.data.Store',
    config: {
        model: 'D.model.Match'
    }
});