Ext.define("Draw.view.PendingInvites", {
    xtype:'pendinginvites',
    extend:'Ext.Container',
    config:{
        xtype: 'container',
        layout: 'vbox',
        width:500,
        items:[
            {
                cls: 'rounded-corner-top',
                xtype:'toolbar',
                title:'Pending invitations'
            },
            {
                xtype:'list',
                scrollable: false,
                itemTpl: '<img width="50" height="50" src="http://graph.facebook.com/{xid}/picture"/> <strong>{name}</strong>',
                store: 'pendingInvites',
                emptyText:'There is no pending invitations.'
            }
        ]

    }
});