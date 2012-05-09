Ext.define("Draw.view.Main", {
    requires: ['Draw.view.PendingInvites', 'Draw.view.game.Matches'],
    id:'mainView',
    extend:'Ext.navigation.View',
    config:
        {
            items:
            [
                {
                    title: 'Draw With Friends',
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    scrollable: true,
                    items:
                        [


                            {
                                margin: 10,
                                id:'createGame',
                                xtype:'button',
                                text:'create game'
                            },
                            {
                                xtype: 'gamematches',
                                id: 'gameMatches'
                            },
                            {
                                xtype: 'component',
                                height: 20
                            },
                            {
                                xtype: 'pendinginvites',
                                id: 'pendingInvites'
                            }

                        ]

                }
           ]
        }
});