
Ext.define('Exxact.model.Customers', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    proxy: {
        type: 'ajax',
        api: {
            read:    'what?do=custs&ex=read',
            update:  'what?do=custs&ex=update',
            create:  'what?do=custs&ex=create',
            destroy: 'what?do=custs&ex=erase'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        simpleSortMode: true,
        filterParam: 'query',
        remoteFilter: true,
        listeners: {
            exception : function(proxy, resp, oper) {
                var result = Ext.JSON.decode(resp.responseText, true);

                Ext.Msg.show({
                    title: 'Customers "' + oper.action + '" Error!',
                    msg: result,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="fields">
    fields: [
        { name: 'id',           type: 'int', unique: true },
        { name: 'profile_name', type: 'string' },
        { name: 'terms',        type: 'string' },
        { name: 'tax_rate',     type: 'float' },
        { name: 'b_company',    type: 'string' },
        { name: 'b_attn',       type: 'string' },
        { name: 'b_street1',    type: 'string' },
        { name: 'b_street2',    type: 'string' },
        { name: 'b_csz',        type: 'string' },
        { name: 'b_contact',    type: 'string' },
        { name: 'b_phone',      type: 'string' },
        { name: 'b_email',      type: 'string' },
        { name: 's_company',    type: 'string' },
        { name: 's_attn',       type: 'string' },
        { name: 's_street1',    type: 'string' },
        { name: 's_street2',    type: 'string' },
        { name: 's_csz',        type: 'string' },
        { name: 's_contact',    type: 'string' },
        { name: 's_phone',      type: 'string' },
        { name: 's_email',      type: 'string' },
        { name: 'ownerID',      type: 'int' },
        { name: 'deleted',      type: 'boolean', defaultValue: false },
        { name: 'username',     type: 'string' }
    ]
    // </editor-fold>
});
