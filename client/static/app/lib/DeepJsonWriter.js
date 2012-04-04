Ext.define('D.lib.DeepJsonWriter', {
    extend:'Ext.data.writer.Json',
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

        return data;
    }
});