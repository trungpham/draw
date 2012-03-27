describe('D.model.Drawing', function(){
    var drawing;
    beforeEach(function(){
        drawing = Ext.create('D.model.Drawing', {
            startTime: (new Date()).getTime()
        });

        var fakeTime = (new Date());
        spyOn(fakeTime, 'getTime').andReturn(drawing.get('startTime')+10);
        spyOn(window, 'Date').andReturn(fakeTime);
    });
    it('should add a stroke action', function(){

        drawing.record({
            action: 'stroke',
            startX: 0,
            startY: 1,
            endX: 2,
            endY: 3,
            size: 4,
            color: 'ffaacc'
        });
        expect(drawing.get('data')).toEqual([['s',10,0,1,2,3,4,'ffaacc']]);
    });
    it('should add the clear action', function(){
        drawing.record({
            action: 'clear'
        });

        expect(drawing.get('data')).toEqual([['c',10]]);
    });
    it('should add the erase action', function(){
        drawing.record({
            action: 'erase',
            startX: 0,
            startY: 1,
            endX: 2,
            endY: 3,
            size: 1
        });
        expect(drawing.get('data')).toEqual([['e',10,0,1,2,3,1]]);
    });
});