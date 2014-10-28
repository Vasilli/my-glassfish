
Ext.define('Exxact.view.quotes.List', {
    extend: 'Ext.grid.Panel',

    xtype: 'quotesList',

    store: 'Quotes',

    //stateful: true,
    //stateId: 'grid_customersList',

    viewConfig: {
        columnLines: true
    },

    initComponent: function () {
        var grid = this;

        // <editor-fold defaultstate="collapsed" desc="grid.columns">
        grid.columns = [
        {   dataIndex: 'id',
            renderer: function(v, meta, rec) {
                return rec.phantom ? '' : v;
            }
            //hidden: true
        },
        {   text: 'Quote Number',
            dataIndex: 'qo_id',
            flex: .1,
            hideable: false
        },
        {   text: 'Create Date',
            dataIndex: 'date',
            flex: .1
        },
        {   text: 'Salesperson',
            dataIndex: 'fullname',
            sortable: false,
            menuDisabled: true,
            flex: .1
        },
        {   text: 'Customer Name',
            dataIndex: 'profile_name',
            sortable: false,
            menuDisabled: true,
            flex: .1
        },
        {   text: 'Customer Contact',
            dataIndex: 'b_contact',
            sortable: false,
            menuDisabled: true,
            flex: .1
        },
        {   text: 'Quote Description',
            dataIndex: 'quote_name',
            flex: 1
        },
        {   text: 'Quote Cost',
            dataIndex: 'cost',
            //formatter: 'usMoney',
            renderer : function(val) {
                if(val > 0) return val;
                return '&nbsp;';
            },
            width: 100
        },
        {   text: '% Quote GP',
            dataIndex: 'base_gp',
            renderer : function(val) {
                if(val > 0) return '<span>' + val + '%</span>';
                return '&nbsp;';
            },
            width: 100
        }
        ],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.dockedItems">
        grid.dockedItems = [
        {
            xtype: 'pagingtoolbar',
            store: 'Quotes',
            dock: 'top',
            displayInfo: true,
            items: ['-',
            {   xtype: 'container',
                flex: .3
            },
            {   xtype: 'searchfield',
                store: 'Quotes',
                emptyText: 'search quote number',
                width: 180
            },
            {   xtype: 'container',
                flex: .1
            },'-',
            {   itemId: 'add',
                text: 'New Quote',
                iconCls: 'quote_add',
                tooltip: 'Add New Quote',
                disabled: true
            }, '-',
            {   itemId: 'update',
                text: 'Update Quote',
                iconCls: 'quote_update',
                tooltip: 'Update Quote',
                disabled: true
            }, '-',
            {   itemId: 'open',
                text: 'Open Quote',
                iconCls: 'quote_open',
                tooltip: 'Open Exists Quote',
                disabled: true
            }, '-',
            {   itemId: 'remove',
                text: 'Remove Quote',
                iconCls: 'quote_delete',
                tooltip: 'Delete Quote',
                disabled: true
            }, '-',
            {   xtype: 'container',
                flex: 1
            }]
        }],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.listeners">
        grid.listeners = {
            //render: function(grid) {
            //    grid.getStore().load();
            //},
            selectionchange: function (view, records) {
                //grid.down('#remove').setDisabled(!records.length);
                //grid.down('#update').setDisabled(!records.length);
                grid.down('#open').setDisabled(!records.length);
            }
        },
        // </editor-fold>
        grid.callParent(arguments);
    }
});

// getQuoteSearchResults
// cid - getQuoteMaxCID  join cid
// quote_data - getQuoteData
// cust_data - getCustData
// quote_cost = getQuoteTotalCost(