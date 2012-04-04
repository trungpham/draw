Ext.define('D.controller.Game', {
    requires: ['Ext.dataview.List', 'D.view.FriendPicker'],
    extend: 'Ext.app.Controller',
    config: {
        control:{
            'button#createGame': {
                tap: 'new'
            },
            friendList: {
                select: 'onFriendSelected',
                disclose: 'onFriendSelected'
            },
            wordsList: {
                select: 'create'
            },
            gameView: {
                submit: 'onSubmitGame'
            }
        },

        refs: {
                main: '#mainView',
                friendList: '#friendListView',
                wordsList: '#wordPickerView list',
                gameView: '#newGameView'
        }
    },

    'new': function(){
        //check to see if user is logged in
        var _this = this;
        D.auth.requireLogin(function(user){

            //get a list of friends
            user.fetchFriends(function(){
                _this.pickFriend();
            });
        });

    },
    pickFriend: function(){
        var friendPicker = Ext.create('D.view.FriendPicker');
        friendPicker.setStore(D.auth.currentUser.friends());
        this.getMain().push(friendPicker);
    },

    //should check to see if there's a pending game to resume before creating a brand new one
    onFriendSelected: function(){
        this.pickWord();
    },
    //pick the word that we want to draw
    pickWord: function(){
        //retrieve a set of words that this user has not yet drawn
        var words = Ext.create('D.store.Words');

        var wordPicker = Ext.create('D.view.game.WordPicker');
        wordPicker.child('list').setStore(words);

        this.getMain().push(wordPicker);

        words.load({
            params: {filter_words_drawn_by: D.auth.currentUser.get('id')},
            callback: function(words){

            }
        });
    },
    create: function(list, record){
        var game = Ext.create('D.model.Game');
        game.drawings().add({});
        var drawing = game.drawings().first();

        var gameView = Ext.create('D.view.game.New', {params: {game: game, drawing: drawing}});


        Ext.Viewport.add(gameView);
        Ext.Viewport.setActiveItem(gameView);
//        var canvas = document.getElementById('new-drawing-canvas');
//        var context = canvas.getContext('2d');
//        context.lineWidth = 25;
//        context.lineCap = "round";
//        context.lineJoin = "round";
//        var drawingListener = Ext.get('new-drawing-listener')
//        gameView.element.addListener('tap', function(e, node){
//            console.log('tap');
//            context.beginPath();
//            context.moveTo(e.pageX, e.pageY - this.getY());
//            context.lineTo(e.pageX, e.pageY - this.getY());
//            context.stroke();
//        });
//        gameView.element.addListener('dragstart', function(e, node){
//            console.log('dragStart: ' + e.pageX, +' ' + e.pageY);
//            context.beginPath();
//            context.moveTo(e.pageX, e.pageY - this.getY());
//        });
//        gameView.element.addListener('drag', function(e, node){
//            console.log('drag: ' + e.pageX, +' ' + e.pageY);
//            context.lineTo(e.pageX, e.pageY - this.getY());
//            context.stroke();
//        });
//        gameView.element.addListener('dragend', function(e, node){
//            console.log('dragEnd: ' + e.pageX, +' ' + e.pageY);
//            context.lineTo(e.pageX, e.pageY - this.getY());
//            context.stroke();
//        });
//
//        gameView.element.addListener('touch', function(e, node){
//            console.log('touch: ' + e.pageX, +' ' + e.pageY);
//        });
//
//        gameView.element.addListener('touchstart', function(e, node){
//            console.log('touchStart: ' + e.pageX, +' ' + e.pageY);
//        });
//
//
//        drawingListener.addListener('touchmove', function(e, node){
//            console.log('touchMove: ' + e.pageX, +' ' + e.pageY);
//        });
    },
    /**
     * this is called when the user is done drawing
     *
     * @param game
     * @param drawing
     */
    onSubmitGame: function(game, drawing){
        //save the game
        game.drawings
    }
});