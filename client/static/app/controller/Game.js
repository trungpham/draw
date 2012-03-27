Ext.define('D.controller.Game', {
    requires: ['Ext.dataview.List', 'D.view.FriendPicker'],
    extend: 'Ext.app.Controller',
    config: {
        control:{
            'button#createGame': {
                tap: 'new'
            },
            friendList: {
                select: 'create',
                disclose: 'create'
            }
        },

        refs: {
                main: '#mainView',
                friendList: '#friendListView'
        }
    },

    'new': function(){
        //check to see if user is logged in
        var _this = this;
        D.auth.requireLogin(function(user){

            //get a list of friends
            user.fetchFriends(function(){
                _this.pickFriends();
            });
        });

    },
    pickFriends: function(){
        var friendPicker = Ext.create('D.view.FriendPicker');
        friendPicker.setStore(D.auth.currentUser.friends());
        this.getMain().push(friendPicker);
    },
    create: function(list, record){
        this.getMain().push(Ext.create('D.view.game.New'
        ));
        var canvas = document.getElementById('new-drawing-canvas');
        var context = canvas.getContext('2d');
        var drawingListener = Ext.get('new-drawing-listener')
        drawingListener.addListener('dragstart', function(e, node){
            console.log(e);
            context.beginPath();
            context.moveTo(e.pageX, e.pageY);
        });
        drawingListener.addListener('drag', function(e, node){
            console.log(e);
            context.lineTo(e.pageX, e.pageY);
            context.stroke();
        });
    }
});