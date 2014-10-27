
Ext.define("Exxact.controller.Parts", {
    extend: 'Ext.app.Controller',

    views: [
        'parts.List',
        'parts.Add',
        'parts.Update',
        'parts.ExternalPriceList'
    ],
    model: [
        'Parts'
    ],
    stores:[
        'Parts',
        'CategoriesWidgets'
    ],

    init: function () {
        var me = this;
        // <editor-fold defaultstate="collapsed" desc="me.control()">
        me.control({
            'partsList > toolbar > button#add': {
                click: me.onPartAddClick
            },
            'partsList > toolbar > button#update': {
                click: me.onPartUpdateClick
            },
            'partsList > toolbar > button#remove': {
                click: me.onPartRemoveClick
            },
            'partsList > toolbar > button#pricelist': {
                click: me.onPartExternalPriceClick
            },
            'partAdd button#save': {
                click: me.onPartAddSaveClick
            },
            'partUpdate button#save': {
                click: me.onPartUpdateSaveClick
            }
        });
        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="onPartAddClick">
    onPartAddClick: function() {

        var window = Ext.widget('partAdd');

        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onPartUpdateClick">
    onPartUpdateClick: function() {

        var rec = this.getGrid().getSelectionModel().getSelection()[0];

        var window = Ext.widget('partUpdate');

        window.show();
        window.down('form').getForm().loadRecord(rec);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onPartRemoveClick">
    onPartRemoveClick: function () {

        var grid = this.getGrid();
        var selection = grid.getSelectionModel().getSelection()[0];
        var rec = selection.getData();

        Ext.Msg.confirm('Delete', 'Are you sure you want to delete ' + rec.mfr_pn + ' ?', function (button) {
            if (button === 'yes') {
                var store = grid.getStore();
                    store.remove(selection);
                    store.sync();
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onPartRemoveClick">
    onPartExternalPriceClick: function () {
        console.log('onPartExternalPriceClick');
        var window = Ext.widget('partPricePrice');

        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onPartAddSaveClick">
    onPartAddSaveClick: function(button) {

        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {

            var values = form.getValues();
            var rec = Ext.create('Exxact.model.Parts', values);

            var store = this.getGrid().getStore();
            store.add(rec); // perform create
            store.sync();

            win.destroy();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onPartUpdateSaveClick">
    onPartUpdateSaveClick: function(button) {

        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {
            var values = form.getValues();

            form.getRecord().set(values); // perform update

            this.getGrid().getStore().sync();

            win.destroy();
        }
    },
    // </editor-fold>
    getGrid: function() {
        return Ext.ComponentQuery.query('partsList')[0];
    }
});
