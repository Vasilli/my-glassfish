
Ext.define('Exxact.model.CategoriesWidget', {
    extend: 'Ext.data.Model',

    idProperty: 'cat_id',

    proxy: {
        type: 'rest',
        url: '/catswidget',
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
                    title: 'Categories Widget "' + oper.action + '" Error!',
                    msg: result.err.code + ' ' + result.err.errno,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="fields">
    fields: [
        {name: 'cat_id',   type: 'int'},
        {name: 'cat_name', type: 'string'}
    ]
    // </editor-fold>
});
