describe('DeepJsonWriter', function(){

    it('should write the data without the id', function(){
        var writer = Ext.create('D.lib.DeepJsonWriter', {});
        var result = writer.cleanUpData({id: '1', data: 'nothing', drawing_id: null, nested: {test_id: null, id: '2', body: 'nothing'}}, true);

        expect(result).toEqual(
            {
                data: 'nothing', nested: {body: 'nothing'}
            }

        );
    });

});