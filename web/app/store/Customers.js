
Ext.define('Exxact.store.Customers', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.Customers',

    remoteSort: true,
    pageSize: 23,
    loadMask: true,

    sorters: [{
        property: 'id',
        direction: 'DESC'
    }]

});
