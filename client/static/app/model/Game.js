Ext.define('D.model.Game', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string' },
            {
                name: 'currentTurn', type: 'integer', defaultValue: 1
            },
            {
                name: 'createdTime', type: 'integer'
            },{
                name: 'nextAction', type: 'string', defaultValue: 'draw' //could be draw/guess
            }
        ],
        hasMany: [
            {
            model: 'D.model.Drawing', name: 'drawings'
        },
            {model: 'D.model.User', name: 'users'} //users who are playing in this game
        ],
        hasOne: [
            {
                name: 'gameStats', model: 'D.model.GameStats'
            },
            {
                name: 'externalFriend', model: 'D.model.ExternalFriend' //the friend who was invited to play with
            }
        ]
    }
});