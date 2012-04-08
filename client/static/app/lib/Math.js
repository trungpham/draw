Ext.define('D.lib.Math', {
    statics: {
        distance: function(point1, point2){
            return Math.sqrt(
                Math.pow(point1[0] - point2[0], 2) +
                Math.pow(point1[1] - point2[1], 2)
            );
        }
    }
})
