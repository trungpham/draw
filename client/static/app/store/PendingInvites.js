Ext.define('D.store.PendingInvites', {
    extend: 'Ext.data.Store',
    config: {
        model: 'D.model.ExternalFriend',
        proxy: {
            type: 'rest',
            url: '/api/pendingInvites'
        }
    }
});