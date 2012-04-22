Ext.define('D.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['D.store.Matches', 'D.store.PendingInvites'],
    config: {

    },

    launch: function(){

        var pendingInvitesStore = Ext.create('D.store.PendingInvites', {
            id: 'pendingInvites'
        });

        var matchesStore = Ext.create('D.store.Matches', {
            id: 'matches'
        });

        var mainView = Ext.create('D.view.Main');

        matchesStore.load();

        pendingInvitesStore.load();

        Ext.Viewport.add(mainView);
    }
});
