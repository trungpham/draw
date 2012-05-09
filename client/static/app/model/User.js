Ext.define('Draw.model.User', {
    requires: ['Ext.data.Store'],
    extend:'Ext.data.Model',
    config:{
        fields:[
            { name:'id', type:'string' },
            { name:'name', type:'string' },
            { name: 'points', type: 'int'}
        ],

//        hasMany:{
//            model:'Draw.model.ExternalFriend',
//            name:'friends',
//            store:{
//                sorters:'lastName',
//                grouper:{
//                    groupFn:function (record) {
//                        return record.get('name')[0];
//                    }
//                }
//            }
//        }
    },

    fetchFriends: function(cb){
        var _this = this;
        var fbFriendsStore = Ext.getStore('fbFriends');

        if (!fbFriendsStore){
            FB.api('/me/friends', function(result){

                Ext.create('Ext.data.Store', {
                    storeId: 'userFriendsStore',
                    model: 'Draw.model.ExternalFriend',
                    data: Ext.Array.map(result.data, function(friend){

                        return {xid: friend.id, name: friend.name, source: 'fb'}
                    }),

                    sorters:'name',
                    grouper:{
                       groupFn:function (record) {
                            return record.get('name')[0];
                        }
                    }

                });

                _this.fireEvent('friends.fetched');
                });

        }
        else{
            this.fireEvent('friends.fetched');
        }

    }
});