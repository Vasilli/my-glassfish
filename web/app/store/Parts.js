
Ext.define('Exxact.store.Parts', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.Parts',

    remoteSort: true,
    pageSize: 23,
    loadMask: true,

    sorters: [{
        property: 'mfr_pn',
        direction: 'DESC'
    }]

});
