
Ext.define('Exxact.view.quotes.Open', {
    extend: 'Ext.grid.Panel',

    xtype: 'quoteOpen',

    //store: 'Quote',
    //stateful: true,
    //stateId: 'grid_customersList',

    constructor: function(config) {
        var grid = this;
        grid.quoterow = config.quoterow;
        console.log('config=',grid.quoterow.id);

        config.store = Ext.create('Exxact.store.Quote');

        grid.viewConfig = {
            columnLines: true
        },
        // <editor-fold defaultstate="collapsed" desc="grid.columns">
        grid.columns = [
        {   dataIndex: 'id',
            renderer: function(v, meta, rec) {
                return rec.phantom ? '' : v;
            }
        }
        ],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.dockedItems">
        grid.dockedItems = [
        {
            xtype: 'pagingtoolbar',
            store: 'Quote',
            dock: 'top',
            displayInfo: true,
            items: ['-',
            {
                itemId: 'qtadd',
                text: 'New Quote',
                iconCls: 'quote_add',
                tooltip: 'Add New Quote',
                disabled: true
            }, '-',
            {
                itemId: 'qtupdate',
                text: 'Update Quote',
                iconCls: 'quote_update',
                tooltip: 'Update Quote',
                disabled: true
            }, '-',
            {
                itemId: 'qtremove',
                text: 'Remove Quote',
                iconCls: 'quote_delete',
                tooltip: 'Delete Quote',
                disabled: true
            }, '-',
            {
                xtype: 'container',
                flex: 1
            }]
        }
        ],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.listeners">
        grid.listeners = {
            render: function(grid) {
                console.log('quote render');
                grid.getStore().load();
            },
            selectionchange: function (view, records) {
                //grid.down('#remove').setDisabled(!records.length);
                //grid.down('#update').setDisabled(!records.length);
                //grid.down('#open').setDisabled(!records.length);
            }
        },
        // </editor-fold>

        grid.callParent(arguments);
    }
});
