Ext.define("D.view.game.Matches", {
    xtype:'gamematches',
    extend:'Ext.Container',
    config:{
        xtype: 'container',
        layout: 'vbox',
        width:500,
        items:[
            {
                cls: 'rounded-corner-top',
                xtype:'toolbar',
                title:'Current Games'
            },
            {
                xtype:'list',
                scrollable: false,
                itemTpl: '<img width="50" height="50" src="http://graph.facebook.com/{xid}/picture"/> <strong>{name}</strong>',
                store: 'matches',
                emptyText:'You have not created any game yet'
            }
        ]

    }
});