Ext.define('Draw.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['Draw.store.Matches', 'Draw.store.PendingInvites'],
    config: {

    },

    launch: function(){

        var pendingInvitesStore = Ext.create('Draw.store.PendingInvites', {
            id: 'pendingInvites'
        });

        var matchesStore = Ext.create('Draw.store.Matches', {
            id: 'matches'
        });

        var mainView = Ext.create('Draw.view.Main');

        matchesStore.load();

        pendingInvitesStore.load();

        Ext.Viewport.add(mainView);
    }
});
