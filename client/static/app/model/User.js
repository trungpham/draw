Ext.define('D.model.User', {
    requires: ['Ext.data.Store'],
    extend:'Ext.data.Model',
    config:{
        fields:[
            { name:'id', type:'string' },
            { name:'name', type:'string' }
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

        if (!this._fetched){
            FB.api('/me/friends', function(result){
                        var i;
                        for (i=0; i< result.data.length; i++){
                            _this.friends().add(result.data[i]);
                        }

                        _this._fetched = true;
                cb();
            });
        }else{
            Ext.defer(cb, 0);
        }

    }
});