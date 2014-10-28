
Ext.define('Exxact.view.parts.List', {
    extend: 'Ext.grid.Panel',

    xtype: 'partsList',

    store: 'Parts',

    //stateful: true,
    //stateId: 'grid_partsList',

    viewConfig: {
        columnLines: true
//        getRowClass: function(record) {
//            return record.get('deleted') ? 'deleted-row' : '';
//        }
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
        {   text: 'Mfr PN',
            dataIndex: 'mfr_pn',
            flex: .15
        },
        {   dataIndex: 'cat',
            hidden: true
        },
        {   text: 'Category',
            dataIndex: 'cat_name',
            flex: .3
        },
        {   text: 'Ingram SKU',
            dataIndex: 'ingramSKU',
            flex: .1
        },
        {   text: 'Cost',
            dataIndex: 'cost',
            formatter: 'usMoney',
            width: 100
        },
        {   text: 'Description',
            dataIndex: 'description',
            flex: 1
        }],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.dockedItems">
        grid.dockedItems = [
        {
            xtype: 'pagingtoolbar',
            store: 'Parts',
            dock: 'top',
            displayInfo: true,
            items: ['-',
            {   xtype: 'container',
                flex: .3
            },
            {   xtype: 'searchfield',
                store: 'Parts',
                emptyText: 'search part by MFR PN',
                width: 180
            },
            {   xtype: 'container',
                flex: .1
            },'-',
            {   itemId: 'add',
                text: 'Add Part',
                iconCls: 'parts_add',
                tooltip: 'Add New Part'
            }, '-',
            {   itemId: 'update',
                text: 'Update Part',
                iconCls: 'parts_edit',
                tooltip: 'Edit Part',
                disabled: true
            }, '-',
            {   itemId: 'remove',
                text: 'Delete Part',
                iconCls: 'parts_delete',
                tooltip: 'Delete Part',
                disabled: true
            }, '-',
            {   itemId: 'pricelist',
                text: 'External Price List',
                iconCls: 'parts_magnify',
                tooltip: 'External Price List',
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
                grid.down('#remove').setDisabled(!records.length);
                grid.down('#update').setDisabled(!records.length);
            }
        },
        // </editor-fold>
        grid.callParent(arguments);
    }
});
