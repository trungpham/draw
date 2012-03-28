//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>

Ext.application({
    name: 'D',

    requires: [
        'Ext.MessageBox',
        'D.lib.Authentication'
    ],
    models: ['User', 'Friend', 'FBFriend', 'Drawing'],
    views: ['Main', 'FriendPicker', 'game.New'],
    controllers: ['Main', 'Game'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // create an instance of the authentication
        D.auth = Ext.create('D.lib.Authentication');

        // Initialize the main view
        Ext.Viewport.add(Ext.create('D.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
