Ext.define('Draw.model.Match', {
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
            },{
                name: 'drawings', persist: true
            }
        ],
        hasMany: [
            {
            model: 'Draw.model.Drawing', name: 'drawings' , associationKey: 'drawings'
        },
            {model: 'Draw.model.User', name: 'users'} //users who are playing in this game
        ],
        hasOne: [
            {
                name: 'gameStats', model: 'Draw.model.GameStats'
            },
            {
                name: 'externalFriend', model: 'Draw.model.ExternalFriend', associationKey: 'external_friend' //the friend who was invited to play with
            },
            {
                name: 'drawingToGuess', model: 'Draw.model.Drawing', associationKey: 'drawing_to_guess'
            },
            {
                name: 'drawingToPlayback', model: 'Draw.model.Drawing', associationKey: 'drawing_to_playback'
            }
        ],
        proxy: {
                type: 'rest',
                url : '/matches'
            }
    }
});