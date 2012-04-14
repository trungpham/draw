Ext.define('D.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {

    },

    launch: function(){
        var pendingInvitesStore = Ext.create('D.store.PendingInvites', {
            id: 'pendingInvitesStore'
        });

        pendingInvitesStore.load();
        // Initialize the main view
        var mainView = Ext.create('D.view.Main');

        Ext.Viewport.add(mainView);
    }
});
