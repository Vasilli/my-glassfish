
Ext.define("Exxact.controller.Quotes", {
    extend: 'Ext.app.Controller',

    views: [
        'quotes.List'
        //'quotes.Add',
        //'quotes.Update'
        //'quotes.Open'
    ],
    model: [
        'Quotes'
        //'Quote'
    ],
    stores:[
        'Quotes'
        //'Quote'
    ],

    init: function () {
        var me = this;
        // <editor-fold defaultstate="collapsed" desc="me.control()">
        me.control({
            'quotesList > toolbar > button#add': {
                click: me.onQuoteAddClick
            },
            'quotesList > toolbar > button#update': {
                click: me.onQuoteUpdateClick
            },
            'quotesList > toolbar > button#open': {
                click: me.onQuoteOpenClick
            },
            'quotesList > toolbar > button#remove': {
                click: me.onQuoteRemoveClick
            },
            'quoteAdd button#save': {
                click: me.onQuoteAddSaveClick
            },
            'quoteUpdate button#save': {
                click: me.onQuoteUpdateSaveClick
            }
        });
        // </editor-fold>
    },

    // <editor-fold defaultstate="collapsed" desc="onQuoteAddClick">
    onQuoteAddClick: function() {

        var window = Ext.widget('userAdd');

        window.show();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onQuoteUpdateClick">
    onQuoteUpdateClick: function() {

        var quotesList = Ext.ComponentQuery.query('quotesList')[0];
        var rec = quotesList.getSelectionModel().getSelection()[0];

        var window = Ext.widget('quoteUpdate');

        window.show();
        window.down('form').getForm().loadRecord(rec);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onQuoteOpenClick">
    onQuoteOpenClick: function() {

        var quotesList = Ext.ComponentQuery.query('quotesList')[0];
        var row = quotesList.getSelectionModel().getSelection()[0];

        Ext.widget('window', {
            title:'Open Quote',
            iconCls: 'quote_open',
            resizable: true,
            frame: true,
            modal: true,
            width : 800,
            height: 400,
            layout: 'fit',
            items: {
                xtype: 'quoteOpen',
                quoterow: row
            }
        }).show();

//        var quotesList = Ext.ComponentQuery.query('quotesList')[0];
//        var rec = quotesList.getSelectionModel().getSelection()[0];

//        var window = Ext.widget('quoteOpen');

//        window.show({ rec: rec });
        //window.down('form').getForm().loadRecord(rec);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onQuoteRemoveClick">
    onQuoteRemoveClick: function () {

        Ext.Msg.confirm('Confirm', 'Quote Remove?', function (button) {
            if (button === 'yes') {
                var quotesList = Ext.ComponentQuery.query('quotesList')[0];
                var store = quotesList.getStore();
                var selection = quotesList.getSelectionModel().getSelection()[0];
                if (selection) {
                    store.remove(selection);
                    store.sync({
                        failure: function(batch, options) {
                            console.log('Err: delete batch='+batch+'\noptions='+options);
                        }
                    });
                }
            }
        });

    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onQuoteAddSaveClick">
    onQuoteAddSaveClick: function(button) {
        //console.log('onQuoteAddSaveClick');
        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {

            var values = form.getValues();
            var rec = Ext.create('Exxact.model.Users', values);

            var quotesList = Ext.ComponentQuery.query('quotesList')[0];
            var store = quotesList.getStore();
            store.add(rec); // perform create
            store.sync();

            win.destroy();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onQuoteUpdateSaveClick">
    onQuoteUpdateSaveClick: function(button) {
        //console.log('onUserUpdateSaveClick');
        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {
            var formRecord = form.getRecord();
            var values = form.getValues();
            formRecord.set(values); // perform update

            var quotesList = Ext.ComponentQuery.query('quotesList')[0];
            var store = quotesList.getStore();
            store.sync();
        }
    }
    // </editor-fold>
});
