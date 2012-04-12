Ext.define("D.view.game.WordPicker", {
    id: 'wordPickerView',
    extend: 'Ext.Container',
    config: {
        title: 'What do you want to draw?',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [
            {
                xtype: 'list',
                scrollable: false,
                itemTpl: '<div class="word-difficulty">{difficulty}</div><div>{value}</div>'
            }
        ]
    }
});