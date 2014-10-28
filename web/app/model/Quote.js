
Ext.define('Exxact.model.Quote', {
    extend: 'Ext.data.Model',

    idProperty: 'qo_id',

    proxy: {
        type: 'ajax',
        api: {
            read:    'what?do=quote&ex=read'
            //update:  'what?do=quotes&ex=update',
            //create:  'what?do=quotes&ex=create',
            //destroy: 'what?do=quotes&ex=erase'
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
                    title: 'Quote "' + oper.action + '" Error!',
                    msg: result,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="fields">
    fields: [
        { name: 'id',            type: 'int' },
        { name: 'qo_id',         type: 'int' }


/*        { name: 'cid',           type: 'int' },
        { name: 'eta',           type: 'string' },
        { name: 'cust_id',       type: 'int' },
        { name: 'sys_qty',       type: 'int' },
        { name: 'dateStamp',     type: 'string' },
        { name: 'ship_method',   type: 'string' },
        { name: 'sales_email',   type: 'string' },
        { name: 'sales_phone',   type: 'string' },
        { name: 'base_gp',       type: 'float' },
        { name: 'option_gp',     type: 'float' },
        { name: 'mfr_pn',        type: 'string' },
        { name: 'part_desc',     type: 'string' },
        { name: 'qty',           type: 'int' },
        { name: 'shipping',      type: 'int' },
        { name: 'deleted',       type: 'boolean', defaultValue: false },
        { name: 'quote_name',    type: 'string' },
        { name: 'config_notes',  type: 'string' },
        { name: 'special_notes', type: 'string' },
        { name: 'EA',            type: 'boolean', defaultValue: false },
        { name: 'CustPO',        type: 'boolean', defaultValue: false },
        { name: 'TBD_SHIP',      type: 'boolean', defaultValue: false },
        { name: 'rowOrder',      type: 'int'  }*/
    ]
    // </editor-fold>
});
