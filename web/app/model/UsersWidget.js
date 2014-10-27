
Ext.define('Exxact.model.UsersWidget', {
    extend: 'Ext.data.Model',
    idProperty: 'id',

    proxy: {
        type: 'rest',
        url: '/userswidget',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        listeners: {
            exception : function(proxy, resp, oper) {
                var result = Ext.JSON.decode(resp.responseText, true);

                Ext.Msg.show({
                    title: 'User Widget "' + oper.action + '" Error!',
                    msg: result.err.code + ' ' + result.err.errno,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="fields">
    fields: [
        {name: 'id',       type: 'int'},
        {name: 'username', type: 'string'}
    ]
    // </editor-fold>
});
