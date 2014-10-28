
Ext.define('Exxact.store.Quotes', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.Quotes',

    pageSize: 23,
    loadMask: true,
    remoteSort: true,

    sorters: [{
        property: 'qo_id',
        direction: 'DESC'
    }]

});
