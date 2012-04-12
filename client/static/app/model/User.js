Ext.define('D.model.User', {
    requires: ['Ext.data.Store', 'D.model.Identity'],
    extend:'Ext.data.Model',
    config:{
        fields:[
            { name:'id', type:'string' },
            { name:'name', type:'string' },
            { name: 'points', type: 'int'}
        ],

        hasMany:{
            model:'D.model.ExternalFriend',
            name:'friends',
            store:{
                sorters:'lastName',
                grouper:{
                    groupFn:function (record) {
                        return record.get('name')[0];
                    }
                }
            }
        }
    },

    fetchFriends: function(cb){
        var _this = this;
        var fbFriendsStore = Ext.getStore('fbFriends');

        if (!fbFriendsStore){
            FB.api('/me/friends', function(result){

                Ext.create('Ext.data.Store', {
                    storeId: 'userFriendsStore',
                    model: 'D.model.Identity',
                    data: Ext.Array.map(result.data, function(friend){

                        return {external_id: friend.id, name: friend.name, source: 'fb'}
                    }),

                    sorters:'lastName',
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