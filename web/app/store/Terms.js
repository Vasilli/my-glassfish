
Ext.define('Exxact.store.Terms', {
    extend: 'Ext.data.ArrayStore',

    model: 'Exxact.model.Term',

    xtype: 'terms',

    data: [
        [0, 'Net 30'],
        [1, 'Net 60'],
        [2, 'Net 90'],
        [3, 'Credit Card'],
        [4, 'Other']
    ]
});
