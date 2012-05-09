Ext.define('Draw.lib.DeepJsonWriter', {
    extend:'Ext.data.writer.Json',
    cleanUpData: function(data, phantom){

        var _data = {};
        var _this = this;

        var key;
        for (key in data){
            if ((key != 'id' || !phantom) && data[key]){
                if (Ext.isObject(data[key])){
                    _data[key] = _this.cleanUpData(data[key], phantom);
                }else{
                    _data[key] = data[key];
                }
            }
        }



       return _data;
    },
    getRecordData:function (record, operation) {
        var isPhantom = record.phantom === true,
            writeAll = this.writeAllFields || isPhantom,
            nameProperty = this.nameProperty,
            fields = record.fields,
            data = {},
            changes,
            name,
            field,
            key;

        if (writeAll) {
            // This is the branch that has been changed from the original Json Writer
            data = record.getData(true);
        } else {
            changes = record.getChanges();
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    name = field[nameProperty] || field.name;
                    data[name] = changes[key];
                }
            }
        }
        if (isPhantom) {
            if (operation && operation.records.length > 1) {
                data[record.clientIdProperty] = record.internalId;
            }
        } else {
            data[record.idProperty] = record.getId();
        }

        return this.cleanUpData(data, isPhantom);
    }
});