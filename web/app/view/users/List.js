
Ext.define('Exxact.view.users.List', {
    extend: 'Ext.grid.Panel',

    xtype: 'usersList',

    store: 'Users',

    //stateful: true,
    //stateId: 'grid_usersList',

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
        {   text: 'User Name',
            dataIndex: 'username',
            flex: 1
        },
        {   text: 'Full Name',
            dataIndex: 'fullname',
            flex: 1
        },
        {   text: 'Email',
            dataIndex: 'email',
            flex: 1
        },
        {   text: 'Phone',
            dataIndex: 'phone',
            flex: 1
        },
        {   text: 'Create Date',
            dataIndex: 'date',
            flex: 1
        },
        {   text: 'Admin',
            dataIndex: 'admin',
            width: 55,
            menuDisabled: true,
            renderer: function(value, meta) { 
                if(value) { meta.tdCls = 'user_suit'; }
            }
        },
        {   text: 'Sales',
            dataIndex: 'sales',
            width: 55,
            menuDisabled: true,
            renderer: function(value, meta) { 
                if(value) { meta.tdCls = 'user_blue'; }
            }
        },
        {   text: 'Deleted',
            dataIndex: 'deleted',
            width: 55,
            menuDisabled: true,
            renderer: function(value, meta) { 
                if(value) { meta.tdCls = 'user_red'; }
            }
        }
        ],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="grid.dockedItems">
        grid.dockedItems = [
        {
            xtype: 'pagingtoolbar',
            store: 'Users',
            dock: 'top',
            displayInfo: true,
            items: ['-',
            {   xtype: 'container',
                flex: .3
            },
            {   xtype: 'searchfield',
                store: 'Users',
                emptyText: 'search user',
                width: 180
            },
            {   xtype: 'container',
                flex: .1
            },'-',
            {   itemId: 'add',
                text: 'Add User',
                iconCls: 'user_add',
                tooltip: 'Add New User'
            }, '-',
            {   itemId: 'update',
                text: 'Update User',
                iconCls: 'user_edit',
                tooltip: 'Edit User',
                disabled: true
            }, '-',
            {   itemId: 'remove',
                text: 'Delete User',
                iconCls: 'user_delete',
                tooltip: 'Delete User',
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

// for search
// http://www.foscode.com/extjs-grid-search/
// http://devjs.eu/en/custom-ext-js-4-plugin-example-simple-grid-filter/
// http://forums.iprodeveloper.com/forums/aft/148129
// new one http://abitofcoding.blogspot.com/2014/02/build-list-grid-searchfield.html
// http://existdissolve.com/2011/11/extjs-4-filtering-on-multiple-fields/
// 
// 
// 
// rowsearch
// http://triin.net/temp/filter-row/
//
//
//
