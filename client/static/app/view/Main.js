Ext.define("D.view.Main", {
    requires: ['D.view.PendingInvites', 'D.view.game.Matches'],
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