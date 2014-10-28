
Ext.define('Exxact.model.Parts', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    proxy: {
        type: 'ajax',
        api: {
            read:    'what?do=parts&ex=read',
            update:  'what?do=parts&ex=update',
            create:  'what?do=parts&ex=create',
            destroy: 'what?do=parts&ex=erase'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        filterParam: 'query',
        remoteFilter: true,
        simpleSortMode: true,
        listeners: {
            exception : function(proxy, resp, oper) {
                var result = Ext.JSON.decode(resp.responseText, true);

                Ext.Msg.show({
                    title: 'Parts "' + oper.action + '" Error!',
                    msg: result,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="fields">
    fields: [
        { name: 'id',          type: 'int' },
        { name: 'cat',         type: 'int' },
        { name: 'mfr_pn',      type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'cost',        type: 'float' },
        { name: 'ingramSKU',   type: 'string' },
        { name: 'cat_name',    type: 'string' }
    ]
    // </editor-fold>
});
