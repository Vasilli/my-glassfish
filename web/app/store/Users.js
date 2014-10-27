
Ext.define('Exxact.store.Users', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.Users',

    remoteSort: true,
    pageSize: 23,
    loadMask: true,

    sorters: [{
        property: 'id',
        direction: 'DESC'
    }]
});
