Ext.define('D.lib.Authentication', {
    requires: ['Ext.Ajax', 'D.model.User'],
    /***
     * Check to see if there user is valida
     * @param {function} callback function
     */
    requireLogin: function(callback){
        if (this.isLoggedIn()){
            callback(this.currentUser);
        }else{
            Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Logging in with Facebook'});
            //try to log in with facebook
            var _this = this;
            FB.login(function(response) {
                console.log(response);
                if (response.authResponse){
                    Ext.Ajax.request({
                        url: '/authenticate/facebook',
                        method: 'POST',
                        params: response.authResponse
                        ,
                        success: function(data){
                            _this.currentUser = Ext.create('D.model.User',  Ext.JSON.decode(data.responseText));
                            callback(_this.currentUser);
                            Ext.Viewport.setMasked(false);

                        }
                    });

                }else{
                    Ext.Msg.alert('Not Logged In', 'You must log in before continuing', Ext.emptyFn);
                    Ext.Viewport.setMasked(false);
                }

             }, {scope: 'email'});

        }
    },
    /**
     * Check to see if the user is logged in
     * @return {boolean}
     */
    isLoggedIn: function(){
        return this.currentUser != undefined;
    }

});