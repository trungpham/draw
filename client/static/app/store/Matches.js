Ext.define('Draw.store.Matches', {
    requires: ['Draw.model.Match'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Draw.model.Match'
    }
});