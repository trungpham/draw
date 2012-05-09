Ext.define('Draw.store.PendingInvites', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Draw.model.ExternalFriend',
        proxy: {
            type: 'rest',
            url: '/api/pendingInvites'
        }
    }
});