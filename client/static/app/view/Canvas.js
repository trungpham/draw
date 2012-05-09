Ext.define("Draw.view.Canvas", {
    extend: 'Ext.Component',
    xtype: 'canvas',
    config: {
        tpl: '<canvas style="background-color: #ffffff" width="{width}" height="{height}"></canvas>'
    },
    initialize: function(){
        this.setData({
                        width: (Ext.Viewport.getWindowWidth() >=  640 ? 640 : Ext.Viewport.getWindowWidth()),
                        height: (Ext.Viewport.getWindowWidth() >=  640 ? 640 : Ext.Viewport.getWindowWidth())
                        });
    }
});