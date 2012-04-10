Ext.define("D.view.Canvas", {
    extend: 'Ext.Component',
    xtype: 'canvas',
    config: {
        data: {
                width: (Ext.Viewport.getWindowWidth() >=  640 ? 640 : Ext.Viewport.getWindowWidth()),
                height: (Ext.Viewport.getWindowWidth() >=  640 ? 640 : Ext.Viewport.getWindowWidth())
                },
        tpl: '<canvas style="background-color: #ffffff" width="{width}" height="{height}"></canvas>'
    }
});