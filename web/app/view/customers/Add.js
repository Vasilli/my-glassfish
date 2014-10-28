
Ext.define('Exxact.view.customers.Add', {
    extend: 'Ext.window.Window',

    xtype: 'customerAdd',

    iconCls: 'user_add',
    title: 'Create Customer',
    width: 700,
    resizable: false,
    modal: true,
    frame: true,

    initComponent: function() {
        var me = this;

        // <editor-fold defaultstate="collapsed" desc="me.items">
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
                items: [{
                    fieldLabel: 'Profile Name',
                    name: 'profile_name',
                    emptyText: 'Profile Name',
                    maxLength : 64,
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
                    items: [{
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
                }]
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
                    {
                        fieldLabel: 'Company',
                        name: 's_company',
                        emptyText: 'Company Name',
                        margin: '32 0 5',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_company'
                    },
                    {   fieldLabel: 'Attention',
                        name: 's_attn',
                        emptyText: 'Attention Name',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_attn'
                    },
                    {   fieldLabel: 'Contact',
                        name: 's_contact',
                        emptyText: 'Contact Name',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_contact'
                    },
                    {   fieldLabel: 'Street Address',
                        name: 's_street1',
                        emptyText: 'Street Address 1',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_street1'
                    },
                    {   fieldLabel: 'Street Address',
                        name: 's_street2',
                        emptyText: 'Street Address 2',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_street2'
                    },
                    {   fieldLabel: 'City, State, Zip',
                        name: 's_csz',
                        emptyText: 'City, State, Zip',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_csz'
                    },
                    {   fieldLabel: 'Phone',
                        name: 's_phone',
                        emptyText: 'xxx-xxx-xxxx Ext: xxxx',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_phone'
                    },
                    {   fieldLabel: 'Email',
                        name: 's_email',
                        emptyText: 'customername@org.com',
                        vtype: 'email',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billName: 'b_email'
                    }]
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
                        maxLength: 64,
                        disabled: true,
                        style: 'opacity:.3'
                    },
                    items: [
                    {
                        xtype: 'checkbox',
                        name: 'billingSameAsMailing',
                        boxLabel: 'Same as Mailing Address?',
                        hideLabel: true,
                        checked: true,
                        margin: '0 0 10 0',
                        scope: this,
                        handler: this.onSameAddressChange,
                        disabled: false,
                        style: 'opacity:1.0'
                    },
                    {
                        fieldLabel: 'Company',
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
                    }]
                    // </editor-fold>
                }]
            }]
        }],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="me.buttons">
        me.buttons = [{
            itemId: 'save',
            text: 'Save'
        }, {
            text: 'Cancel',
            scope: me,
            handler: me.close
        }],
        // </editor-fold>
        me.callParent(arguments);
    },

    // <editor-fold defaultstate="collapsed" desc="onMailingAddrFieldChange">
    onMailingAddrFieldChange: function(field) {

        var copyToBilling = this.down('[name=billingSameAsMailing]').getValue();
        var copyField = this.down('[name=' + field.billName + ']');

        if(copyToBilling) {
            copyField.setValue(field.getValue());
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onSameAddressChange">
    onSameAddressChange: function(box, checked) {

        // copy ship to bill address
        var mail_id = Ext.ComponentQuery.query('#mail_id')[0];
        Ext.Array.forEach(mail_id.query('textfield'), function(field) {
            this.onMailingAddrFieldChange(field);
        }, this);
 
        var fieldset = box.ownerCt;
        // set opacity and disable
        Ext.Array.forEach(fieldset.query('textfield'), function(field) {
            field.setDisabled(checked);
            field.el.animate({ opacity: checked ? 0.3 : 1.0 });
        });
    }
    // </editor-fold>
});
