Ext.define("D.view.Main", {
    requires: ['D.view.PendingInvites'],
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
                                xtype: 'pendinginvites',
                                id: 'pendingInvites'
                            }

                        ]

                }
           ]
        }
});