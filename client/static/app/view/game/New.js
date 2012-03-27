Ext.define("D.view.game.New", {
    id:'gameNewView',
    extend:'Ext.Container',
    config: {
        title: 'Draw something',
        items: [
            {
                xtype: 'container',
                html: '<canvas height="500" width="500" style="width:500px;height:500px;" id="new-drawing-canvas"></canvas><div style="width:500px;height:500px;position:absolute;top:0;left:0;" id="new-drawing-listener"></div>'

            }
        ]

    }
});