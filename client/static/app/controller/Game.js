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
        var gameView = Ext.create('D.view.game.New');
        this.getMain().push(Ext.create('D.view.game.New'
        ));
        var canvas = document.getElementById('new-drawing-canvas');
        var context = canvas.getContext('2d');
        context.lineWidth = 25;
        context.lineCap = "round";
        context.lineJoin = "round";
        var drawingListener = Ext.get('new-drawing-listener')
        gameView.el.addListener('tap', function(e, node){
            console.log('tap');
            context.beginPath();
            context.moveTo(e.pageX, e.pageY - this.getY());
            context.lineTo(e.pageX, e.pageY - this.getY());
            context.stroke();
        });
        gameView.el.addListener('dragstart', function(e, node){
            console.log('dragStart: ' + e.pageX, +' ' + e.pageY);
            context.beginPath();
            context.moveTo(e.pageX, e.pageY - this.getY());
        });
        gameView.el.addListener('drag', function(e, node){
            console.log('drag: ' + e.pageX, +' ' + e.pageY);
            context.lineTo(e.pageX, e.pageY - this.getY());
            context.stroke();
        });
        gameView.el.addListener('dragend', function(e, node){
            console.log('dragEnd: ' + e.pageX, +' ' + e.pageY);
            context.lineTo(e.pageX, e.pageY - this.getY());
            context.stroke();
        });

        gameView.el.addListener('touch', function(e, node){
            console.log('touch: ' + e.pageX, +' ' + e.pageY);
        });

        gameView.el.addListener('touchstart', function(e, node){
            console.log('touchStart: ' + e.pageX, +' ' + e.pageY);
        });


        drawingListener.addListener('touchmove', function(e, node){
            console.log('touchMove: ' + e.pageX, +' ' + e.pageY);
        });
    }
});