
Ext.define('Exxact.model.Users', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    proxy: {
        //type: 'rest',
        //url: '/users',
        //limitParam: 'rows',
        //extraParams: {
        //    wt: 'json',
        //   'json.nl': 'arrarr'
        //},
        type: 'ajax',
        api: {
            read:    'what?do=users&ex=read',
            update:  'what?do=users&ex=update',
            create:  'what?do=users&ex=create',
            destroy: 'what?do=users&ex=erase'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        //simpleSortMode: true
        filterParam: 'query',
        remoteFilter: true,
        listeners: {
            exception : function(proxy, resp, oper) {
                var result = Ext.JSON.decode(resp.responseText, true);

                Ext.Msg.show({
                    title: 'Users "' + oper.action + '" Error!',
                    msg: result,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="fields">
    fields: [
        { name: 'id',       type: 'int', unique: true },
        { name: 'username', type: 'string',  defaultValue: '' },
        { name: 'passwd',   type: 'string',  defaultValue: '' },
        { name: 'admin',    type: 'boolean', defaultValue: false },
        { name: 'sales',    type: 'boolean', defaultValue: false },
        //{ name: 'date',     type: 'string',  defaultValue: '' },
        { name: 'fullname', type: 'string',  defaultValue: '' },
        { name: 'email',    type: 'string',  defaultValue: '' },
        { name: 'phone',    type: 'string',  defaultValue: '' },
        { name: 'deleted',  type: 'boolean', defaultValue: false }
    ]
    // </editor-fold>
});
