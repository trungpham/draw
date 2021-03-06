//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>

Ext.application({
    name: 'Draw',

    requires: [
        'Ext.MessageBox',
        'Ext.Viewport',
        'Draw.lib.Authentication',
        'Draw.lib.DeepJsonWriter',
        'Draw.lib.Math'
    ],
    models: ['User', 'ExternalFriend', 'Drawing', 'Guess'],
    views: ['Main', 'FriendPicker', 'game.New', 'game.Guess'],
    controllers: ['Main', 'Game', 'Test'],

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
        Draw.auth = Ext.create('Draw.lib.Authentication');


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
