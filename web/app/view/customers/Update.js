
Ext.define('Exxact.view.customers.Update', {
    extend: 'Ext.window.Window',

    xtype: 'customerUpdate',

    iconCls: 'user_edit',
    title: 'Update Customer',
    width: 700,
    resizable: false,
    modal: true,
    frame: true,

    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'form',
            bodyPadding: 10,

            items: [
            {
                // <editor-fold defaultstate="collapsed" desc="fieldset Customer Contact Information">
                xtype: 'fieldset',
                title: 'Customer Contact Information',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    labelAlign: 'right',
                    labelWidth: 90
                },
                items: [
                {
                    fieldLabel: 'Profile Name',
                    name: 'profile_name',
                    emptyText: 'Profile Name',
                    maxLength: 64,
                    combineErrors: true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaultType: 'combobox',
                    margin: '0 0 5 0',
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 90
                    },
                    items: [
                    {
                        fieldLabel: 'Tax rate',
                        name: 'tax_rate',
                        emptyText: 'Tax rate',
                        flex: 1,
                        store: Ext.create('Exxact.store.Taxrates'),
                        valueField: 'num',
                        displayField: 'desc',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true
                        //allowBlank: false
                    },
                    {
                        fieldLabel: 'Terms',
                        name: 'terms',
                        emptyText: 'Terms',
                        flex: 1,
                        store: Ext.create('Exxact.store.Terms'),
                        valueField: 'desc',
                        displayField: 'desc',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true
                        //allowBlank: false
                    }]
                }
                ]
                // </editor-fold>
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                {
                    // <editor-fold defaultstate="collapsed" desc="fieldset Mailing Address">
                    itemId: 'mail_id',
                    xtype: 'fieldset',
                    flex: 1,
                    title: 'Mailing Address',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth: 90,
                        maxLength: 64
                    },
                    items: [
                    {   fieldLabel: 'Company',
                        name: 's_company',
                        emptyText: 'Company Name'
                    },
                    {   fieldLabel: 'Attention',
                        name: 's_attn',
                        emptyText: 'Attention Name'
                    },
                    {   fieldLabel: 'Contact',
                        name: 's_contact',
                        emptyText: 'Contact Name'
                    },
                    {   fieldLabel: 'Street Address',
                        name: 's_street1',
                        emptyText: 'Street Address 1'
                    },
                    {   fieldLabel: 'Street Address',
                        name: 's_street2',
                        emptyText: 'Street Address 2'
                    },
                    {   fieldLabel: 'City, State, Zip',
                        name: 's_csz',
                        emptyText: 'City, State, Zip'
                    },
                    {   fieldLabel: 'Phone',
                        name: 's_phone',
                        emptyText: 'xxx-xxx-xxxx Ext: xxxx'
                    },
                    {   fieldLabel: 'Email',
                        name: 's_email',
                        emptyText: 'customername@org.com',
                        vtype: 'email'
                    }
                    ]
                    // </editor-fold>
                },
                {
                    xtype: 'component',
                    width: 10
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="fieldset Billing Address">
                    xtype: 'fieldset',
                    flex: 1,
                    title: 'Billing Address',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelAlign: 'right',
                        labelWidth: 90,
                        maxLength: 64
                    },
                    items: [
                    {   fieldLabel: 'Company',
                        name: 'b_company',
                        emptyText: 'Company Name'
                    },
                    {   fieldLabel: 'Attention',
                        name: 'b_attn',
                        emptyText: 'Attention Name'
                    },
                    {   fieldLabel: 'Contact',
                        name: 'b_contact',
                        emptyText: 'Contact Name'
                    },
                    {   fieldLabel: 'Street Address',
                        name: 'b_street1',
                        emptyText: 'Street Address 1'
                    },
                    {   fieldLabel: 'Street Address',
                        name: 'b_street2',
                        emptyText: 'Street Address 2'
                    },
                    {   fieldLabel: 'City, State, Zip',
                        name: 'b_csz',
                        emptyText: 'City, State, Zip'
                    },
                    {   fieldLabel: 'Phone',
                        name: 'b_phone',
                        emptyText: 'xxx-xxx-xxxx Ext: xxxx'
                    },
                    {   fieldLabel: 'Email',
                        name: 'b_email',
                        emptyText: 'customername@org.com',
                        vtype: 'email'
                    }
                    ]
                    // </editor-fold>
                }]
            },
            {
                xtype:'checkbox',
                fieldLabel: 'Delete',
                name: 'deleted',
                labelAlign: 'right',
                labelWidth: 90
            }]
        }],
        // <editor-fold defaultstate="collapsed" desc="me.buttons">
        me.buttons = [{
            itemId: 'save',
            text: 'Update'
        }, {
            text: 'Cancel',
            scope: me,
            handler: me.close
        }],
        // </editor-fold>
        me.callParent(arguments);
    }
});
