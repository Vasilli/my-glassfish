
Ext.define("Exxact.controller.Customers", {
    extend: 'Ext.app.Controller',

    views: [
        'customers.List',
        'customers.Add',
        'customers.Update'
    ],
    model: [
        'Customers'
    ],
    stores:[
        'Customers',
        'Terms',
        'Taxrates'
        //'UsersWidgets'
    ],

    init: function () {
        var me = this;

        // <editor-fold defaultstate="collapsed" desc="me.control()">
        me.control({
            'customersList > toolbar > button#add': {
                click: me.onCustomerAddClick
            },
            'customersList > toolbar > button#update': {
                click: me.onCustomerUpdateClick
            },
            'customersList > toolbar > button#remove': {
                click: me.onCustomerRemoveClick
            },
            'customersList > toolbar > button#quote': {
                click: me.onCustomerQuoteClick
            },
            'customersList > toolbar > button#eco': {
                click: me.onCustomerEcoClick
            },
            'customerAdd button#save': {
                click: me.onCustomerAddSaveClick
            },
            'customerUpdate button#save': {
                click: me.onCustomerUpdateSaveClick
            }
        });
        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="onCustomerAddClick">
    onCustomerAddClick: function() {

        var window = Ext.widget('customerAdd');

        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onCustomerUpdateClick">
    onCustomerUpdateClick: function() {

        var rec = this.getGrid().getSelectionModel().getSelection()[0];

        var window = Ext.widget('customerUpdate');

        window.show();
        window.down('form').getForm().loadRecord(rec);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onCustomerRemoveClick">
    onCustomerRemoveClick: function () {

        var grid = this.getGrid();
        var selection = grid.getSelectionModel().getSelection()[0];
        var rec = selection.getData();

        Ext.Msg.confirm('Delete', 'Are you sure you want to delete ' + rec.profile_name + ' ?', function (button) {
            if (button === 'yes') {
                var store = grid.getStore();
                store.remove(selection);
                store.sync();
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onCustomerQuoteClick">
    onCustomerQuoteClick: function() {
        console.log('onCustomerQuoteClick');
//        var window = Ext.widget('customerAdd');

//        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onCustomerEcoClick">
    onCustomerEcoClick: function() {
        console.log('onCustomerEcoClick');
//        var window = Ext.widget('customerAdd');

//        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onCustomerAddSaveClick">
    onCustomerAddSaveClick: function(button) {

        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {

            var values = form.getValues();
            // copy ship to bill address
            if(values.billingSameAsMailing === 'on') {
                values.b_company = values.s_company;
                values.b_attn    = values.s_attn;
                values.b_contact = values.s_contact;
                values.b_street1 = values.s_street1;
                values.b_street1 = values.s_street1;
                values.b_csz     = values.s_csz;
                values.b_phone   = values.s_phone;
                values.b_email   = values.s_email;
            }
            // take id,user from cookie
            var user = Ext.decode(Ext.util.Cookies.get('user'));
            values.ownerID = user.id;
            values.username = user.name;

            var rec = Ext.create('Exxact.model.Customers', values);

            var store = this.getGrid().getStore();
            store.add(rec); // perform create
            store.sync();

            win.destroy();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onCustomerUpdateSaveClick">
    onCustomerUpdateSaveClick: function(button) {

        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {
            var values = form.getValues();
            // boolean fix
            if(!values.deleted) { values.deleted = 'off'; }

            // take id,user from cookie
            var user = Ext.decode(Ext.util.Cookies.get('user'));
            values.ownerID = user.id;
            values.username = user.name;

            form.getRecord().set(values); // perform update

            this.getGrid().getStore().sync();

            win.destroy();
        }
    },
// </editor-fold>
    getGrid: function() {
        return Ext.ComponentQuery.query('customersList')[0];
    }
});
