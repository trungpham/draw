Ext.define('D.view.SizeSelector', {
    extend: 'Ext.Panel',
    xtype:'sizeselector',
    currentSize: 'tiny',
    config: {
        data:['tiny', 'small', 'medium', 'large'],
        tpl:'<tpl for="."><div class="size-select" data-size="{.}"><div data-size="{.}" class="full-circle size-select-{.}"></div></div></tpl>',
        modal:true,
        width:50,
        height:164,
        hideOnMaskTap:true,
        listeners:{
            painted: function(){

                var _this = this;
                _this.element.select('.size-select[data-size="'+this.currentSize+'"]').addCls('size-select-active');

                this.element.on('tap', function(e, node){
                    //add the active class
                    var size = node.getAttribute('data-size');


                    //is this already active?
                    if (size != _this.currentSize){
                        _this.currentSize = size;

                        //remove the other active
                        _this.element.select('.size-select-active').toggleCls('size-select-active');

                        var dom = _this.element.query('.size-select[data-size="'+size+'"]')[0];
                        Ext.get(dom).addCls('size-select-active');

                        _this.fireEvent('sizeChanged', size);
                    }

                    _this.hide();

                })
            }
        }


    }

});