
Ext.define('Exxact.store.Quotes', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.Quotes',

    pageSize: 24,
    loadMask: true,
    remoteSort: true,

    sorters: [{
        property: 'qo_id',
        direction: 'DESC'
    }]

});
