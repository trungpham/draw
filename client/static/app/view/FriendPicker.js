Ext.define("D.view.FriendPicker", {
    //id: 'friendPickerView',
    id: 'friendListView',
    extend: 'Ext.List',
    config: {


        title: 'Who do you want to play with?',
        onItemDisclosure: true,
        grouped     : true,
        indexBar    : true,
        xtype: 'list',
        itemTpl: '<img width="50" height="50" src="http://graph.facebook.com/{xid}/picture"/> <strong>{name}</strong>'



    }
});