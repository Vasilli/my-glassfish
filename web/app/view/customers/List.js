
Ext.define('Exxact.view.customers.List', {
    extend: 'Ext.grid.Panel',

    xtype: 'customersList',

    store: 'Customers',

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
            },
            hidden: true
        },
        {   text: 'Profile Name',
            dataIndex: 'profile_name',
            flex: 1,
            hideable: false
        },
        {   dataIndex: 'terms',     hidden: true
        },
        {   dataIndex: 'tax_rate',  hidden: true
        },
        {   text: 'Company',
            dataIndex: 'b_company',
            flex: 1,
            hideable: false
        },
        {   text: 'Attention',
            dataIndex: 'b_attn',
            flex: 1,
            hideable: false
        },
        {   dataIndex: 'b_street1', hidden: true
        },
        {   dataIndex: 'b_street2', hidden: true
        },
        {   text: 'Contact',
            dataIndex: 'b_contact',
            flex: 1,
            hideable: false
        },
        {   text: 'City,State,Zip',
            dataIndex: 'b_csz',
            flex: 1,
            hideable: false
        },
        {   text: 'Phone',
            dataIndex: 'b_phone',
            flex: 1,
            hideable: false
        },
        {   dataIndex: 'b_email',   hidden: true
        },
        {   dataIndex: 's_company', hidden: true
        },
        {   dataIndex: 's_attn',    hidden: true
        },
        {   dataIndex: 's_street1', hidden: true
        },
        {   dataIndex: 's_street2', hidden: true
        },
        {   dataIndex: 's_contact', hidden: true
        },
        {   dataIndex: 's_csz',     hidden: true
        },
        {   dataIndex: 'b_phone',   hidden: true
        },
        {   dataIndex: 'b_email',   hidden: true
        },
        {   text: 'User',
            dataIndex: 'username',
            flex: .6,
            hideable: false
        },
        {   text: 'Deleted',
            dataIndex: 'deleted',
            width: 55,
            sortable: false,
            menuDisabled: true,
            renderer: function(value, meta) { 
                if(value) { meta.tdCls = 'user_red'; }
            }
        }
/*        {   text: 'User',
            dataIndex: 'username',
            width: 210,
            hideable: false,
            xtype: 'widgetcolumn',
            stopSelection: false, // ==true grid row dont select
            widget: {
                xtype: 'combo',
                displayField: 'username',
                //valueField: 'username',
                valueField: 'id',
                emptyText: 'User Name',
                store: Ext.create('Exxact.store.UsersWidgets'),
                queryParam: 'search',
                typeAhead: true,
                typeAheadDelay: 100,
                pageSize: 1,
                minChars: 2,
                listeners: {
                    select: function(select) {
                        var userstore = select.getStore();
                         console.log('select getData=',userstore.getModifiedRecords());//.getData());
                       //userstore.setFields({id:55,username:'bababa'});
                        //console.log('select store=',select.getStore().getData());
                        //console.log('select valueRow=',select.getRawValue()); // username
                        //console.log('select value=',select.getValue()); // id
        
                        var store = grid.getStore();
                         console.log('select ssgetData=',store.getModifiedRecords());//.getData());
                        //store.suspendEvents();

                        var record = grid.getSelectionModel().getSelection()[0];
                        //console.log('select record=',record);
                        record.set('ownerID', select.getValue()); // id

                        //store.resumeEvents();

                        store.sync();
                        //store.reload();
                    }
                }
            }
        }*/
        ],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.dockedItems">
        grid.dockedItems = [
        {
            xtype: 'pagingtoolbar',
            store: 'Customers',
            dock: 'top',
            displayInfo: true,
            items: ['-',
            {   xtype: 'container',
                flex: .3
            },
            {   xtype: 'searchfield',
                store: 'Customers',
                emptyText: 'search customer',
                width: 180
            },
            {   xtype: 'container',
                flex: .1
            },'-',
            {   itemId: 'add',
                text: 'Add Customer',
                iconCls: 'user_add',
                tooltip: 'Add New Customer'
            }, '-',
            {   itemId: 'update',
                text: 'Update Customer',
                iconCls: 'user_edit',
                tooltip: 'Edit Customer',
                disabled: true
            }, '-',
            {   itemId: 'remove',
                text: 'Delete Customer',
                iconCls: 'user_delete',
                tooltip: 'Delete Customer',
                disabled: true
            }, '-',
            {   itemId: 'quote',
                text: 'Create Quote',
                iconCls: 'quote_add',
                tooltip: 'Create Quote',
                disabled: true
            }, '-',
            {   itemId: 'eco',
                text: 'ECO',
                iconCls: 'eco_add',
                tooltip: 'ECO',
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
                //var combo = Ext.ComponentQuery.query('#combo')[0];
                //combo.setDisabled(!records.length);
                grid.down('#update').setDisabled(!records.length);
                //grid.down('#remove').setDisabled(!records.length);
                //grid.down('#quote').setDisabled(!records.length);
                //grid.down('#eco').setDisabled(!records.length);
            }
        },
        // </editor-fold>
        grid.callParent(arguments);
    }
});
