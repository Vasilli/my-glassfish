
Ext.define('Exxact.store.UsersWidgets', {
    extend: 'Ext.data.Store',

    model: 'Exxact.model.UsersWidget',

    xtype: 'userswidgets',

    pageSize: 25,
    loadMask: true,

    sorters: [{
        property: 'username',
        direction: 'ASC'
    }]
});
