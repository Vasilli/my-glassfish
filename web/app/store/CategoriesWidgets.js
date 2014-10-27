
Ext.define('Exxact.store.CategoriesWidgets', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.CategoriesWidget',

    xtype: 'categorieswidgets',

    pageSize: 15,

    sorters: [{
        property: 'cat_name',
        direction: 'ASC'
    }]
});
