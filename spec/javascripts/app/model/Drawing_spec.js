describe('D.model.Drawing', function(){
    var drawing;
    beforeEach(function(){
        drawing = Ext.create('D.model.Drawing', {
            startTime: (new Date()).getTime()
        });

        var fakeTime = (new Date());
        spyOn(fakeTime, 'getTime').andReturn(drawing.get('createdTime')+10);
        spyOn(window, 'Date').andReturn(fakeTime);
    });
    it('should add change pen color action', function(){
        drawing.record({
            action: 'penColor',
            color: 'ffaacc'
        });
        expect(drawing.get('data')).toEqual([['penColor', 10, 'ffaacc']]);
    });
    it('should record pencil size change', function(){
        drawing.record({
            action: 'penSize',
            size: 1
        });
        expect(drawing.get('data')).toEqual([['penSize', 10, 1]]);
    });

    it('should record erase size change', function(){
        drawing.record({
            action: 'eraseSize',
            size: 1
        });
        expect(drawing.get('data')).toEqual([['eraseSize', 10, 1]]);
    });

    it('should add a pen action', function(){

        drawing.record({
            action: 'pen',
            startX: 0,
            startY: 1,
            endX: 2,
            endY: 3
        });
        expect(drawing.get('data')).toEqual([['p',10,0,1,2,3]]);
    });
    it('should add the clear action', function(){
        drawing.record({
            action: 'clear'
        });

        expect(drawing.get('data')).toEqual([['clear',10]]);
    });
    it('should add the erase action', function(){
        drawing.record({
            action: 'erase',
            startX: 0,
            startY: 1,
            endX: 2,
            endY: 3
        });
        expect(drawing.get('data')).toEqual([['e',10,0,1,2,3]]);
    });

    it('should add the dot action', function(){
        drawing.record({
            action: 'dot',
            x: 1,
            y: 2
        });
        expect(drawing.get('data')).toEqual([['d',10, 1, 2]]);
    });
});