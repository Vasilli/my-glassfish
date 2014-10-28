
Ext.define('Exxact.store.Quote', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.Quote',

    pageSize: 15,
    loadMask: true,
    remoteSort: true,

    sorters: [{
        property: 'qo_id',
        direction: 'DESC'
    }]

});
