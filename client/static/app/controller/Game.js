Ext.define('D.controller.Game', {
    requires: ['Ext.dataview.List', 'D.view.FriendPicker'],
    extend: 'Ext.app.Controller',
    config: {
        control:{
            'button#createGame': {
                tap: 'new'
            },
            friendList: {
                itemtap: 'onFriendSelected'

            },
            wordsList: {
                itemtap: 'onWordSelected'
            },
            gameView: {
                submit: 'onSubmitGame'
            }
        },
        routes: {
            '/pickFriend': 'pickFriend',
            '/pickWord': 'pickWord',
            '/draw/invite/:friendId/word/:wordId': 'drawForFriend'
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
                _this.redirectTo('/pickFriend');
            });
        });

    },
    pickFriend: function(){
        var friendPicker = Ext.create('D.view.FriendPicker');
        friendPicker.setStore(D.auth.currentUser.friends());
        this.getMain().push(friendPicker);
    },

    //should check to see if there's a pending game to resume before creating a brand new one
    onFriendSelected: function(view, index, target, record){
        this.selectedFriend = record;
        this.redirectTo('/pickWord');
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
    onWordSelected: function(view, index, target, record){
        this.selectedWord = record;
        this.redirectTo('/draw/invite/'+this.selectedFriend.getId()+'/word/'+this.selectedWord.getId());
    },
    drawForFriend: function(friendId, wordId){
        var game = Ext.create('D.model.Match');
        game.drawings().add({});
        var drawing = game.drawings().first();

        var gameView = Ext.create('D.view.game.New', {params: {game: game, drawing: drawing}});


        Ext.Viewport.add(gameView);
        Ext.Viewport.setActiveItem(gameView);
    },
    /**
     * this is called when the user is done drawing
     *
     * @param game
     * @param drawing
     */
    onSubmitGame: function(game, drawing){
        debugger
        //save the game
        game.drawings
    }
});