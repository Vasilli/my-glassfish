
Ext.define("Exxact.controller.Users", {
    extend: 'Ext.app.Controller',

    views: [
        'users.List',
        'users.Add',
        'users.Update'
    ],
    model: [
        'Users'
    ],
    stores:[
        'Users'
    ],

    init: function () {
        var me = this;
        // <editor-fold defaultstate="collapsed" desc="me.control()">
        me.control({
            'usersList > toolbar > button#add': {
                click: me.onUserAddClick
            },
            'usersList > toolbar > button#update': {
                click: me.onUserUpdateClick
            },
            'usersList > toolbar > button#remove': {
                click: me.onUserRemoveClick
            },
            'userAdd button#save': {
                click: me.onUserAddSaveClick
            },
            'userUpdate button#save': {
                click: me.onUserUpdateSaveClick
            }
        });
        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="onUserAddClick">
    onUserAddClick: function(button) {

        var window = Ext.widget('userAdd');

        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onUserUpdateClick">
    onUserUpdateClick: function(button) {

        var rec = this.getGrid().getSelectionModel().getSelection()[0];

        var window = Ext.widget('userUpdate');

        window.show();
        window.down('form').getForm().loadRecord(rec);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onUserRemoveClick">
    onUserRemoveClick: function(button) {

        var grid = this.getGrid();
        var selection = grid.getSelectionModel().getSelection()[0];
        var rec = selection.getData();

        Ext.Msg.confirm('Delete', 'Are you sure you want to delete ' + rec.username + ' ?' , function (button) {
            if(button === 'yes') {
                var store = grid.getStore();
                store.remove(selection);
                store.sync();
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onUserAddSaveClick">
    onUserAddSaveClick: function(button) {
        //console.log('onUserAddSaveClick');
        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {
            var values = form.getValues();
            // crypt password
            values.passwd = Exxact.utils.MD5.encode(values.passwd);

            var rec = Ext.create('Exxact.model.Users', values);

            var store = this.getGrid().getStore();
            store.add(rec); // perform create
            store.sync();

            win.destroy();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onUserUpdateSaveClick">
    onUserUpdateSaveClick: function(button) {
        //console.log('onUserUpdateSaveClick');
        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {
            var values = form.getValues();

            // crypt password
            if(values.passwd) {
                values.passwd = Exxact.utils.MD5.encode(values.passwd);
            }

            // boolean fix
            if(!values.admin)   { values.admin = 'off'; }
            if(!values.sales)   { values.sales = 'off'; }
            if(!values.deleted) { values.deleted = 'off'; }

            form.getRecord().set(values); // perform update

            this.getGrid().getStore().sync();

            win.destroy();
        }
    },
    // </editor-fold>
    getGrid: function() {
        return Ext.ComponentQuery.query('usersList')[0];
    }
});
