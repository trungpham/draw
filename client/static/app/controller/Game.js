Ext.define('Draw.controller.Game', {
    requires: ['Ext.dataview.List', 'Draw.view.FriendPicker', 'Draw.store.Words', 'Draw.view.game.WordPicker', 'Draw.view.game.Guess'],
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
            },
            gameMatchesList: {
                itemtap: 'onMatchSelected'
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
                gameView: '#newGameView',
                gameMatchesList: '#gameMatches list'
        }
    },

    'new': function(){
        //check to see if user is logged in
        var _this = this;
        Draw.auth.requireLogin(function(user){

            //get a list of friends
            user.fetchFriends();

            user.on('friends.fetched', function(){
                _this.redirectTo('/pickFriend');
            });
        });

    },
    pickFriend: function(){
        var friendPicker = Ext.create('Draw.view.FriendPicker');
        friendPicker.setStore(Ext.getStore('userFriendsStore'));
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
        var words = Ext.create('Draw.store.Words', {
            storeId: 'wordsStore'
        });

        var wordPicker = Ext.create('Draw.view.game.WordPicker');
        wordPicker.child('list').setStore(words);

        this.getMain().push(wordPicker);

        words.load({
            params: {filter_words_drawn_by: Draw.auth.currentUser.get('id')},
            callback: function(words){

            }
        });
    },
    onWordSelected: function(view, index, target, record){
        this.selectedWord = record;
        this.redirectTo('/draw/invite/'+this.selectedFriend.getId()+'/word/'+this.selectedWord.getId());
    },
    drawForFriend: function(friendId, wordId){
        var word = Ext.getStore('wordsStore').getById(wordId);
        var friend = Ext.getStore('userFriendsStore').getById(friendId);
        var drawing = Ext.create('Draw.model.Drawing');
        drawing.setWord(word);
        drawing.setExternalFriend(friend);
        var gameView = Ext.create('Draw.view.game.New', {data: {word: word, friend: friend, drawing: drawing}});


        Ext.Viewport.add(gameView);
        Ext.Viewport.setActiveItem(gameView);
    },
    /**
     * this is called when the user is done drawing
     *
     * @param game
     * @param drawing
     */
    onSubmitGame: function(data){
        var _this = this;
        var drawing = data.drawing;

        drawing.save(function(){

            _this.getMain().reset();
            Ext.Viewport.remove(_this.getGameView());

            _this.redirectTo('/');

        });
    },

    /**
     * What to do when the user picked on a match
     * Should we let the user guess on the drawing or playback the drawing?
     *
     */
    onMatchSelected: function(view, index, target, record){
        var Drawing = Ext.ModelMgr.getModel('Draw.model.Drawing');
        if (record.get('drawingToGuess')){
            //send user to the guess view
            Drawing.load(record.get('drawingToGuess').id, {
                success: function(drawing){


                    var guessView = Ext.create('Draw.view.game.Guess', {record: drawing.getGuess()});

                    Ext.Viewport.add(guessView);
                    Ext.Viewport.setActiveItem(guessView);

                }
            });
        }
    }
});