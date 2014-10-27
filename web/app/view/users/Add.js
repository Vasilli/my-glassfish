
Ext.define('Exxact.view.users.Add', {
    extend: 'Ext.window.Window',

    xtype: 'userAdd',

    iconCls: 'user_add',
    title: 'Create User',
    width: 400,
    resizable: false,
    modal: true,
    frame: true,

    initComponent: function() {
        var me = this;

        // <editor-fold defaultstate="collapsed" desc="me.items">
        me.items = [{
            xtype: 'form',
            bodyPadding: 20,

            defaults: {
                xtype: 'textfield',
                msgTarget: 'side',
                anchor: '100%',
                maxLength: 32,
                allowBlank: true,
                allowOnlyWhitespace: true
            },
            items: [
            {   fieldLabel: 'User Name',
                name: 'username',
                emptyText: 'user name',
                allowBlank: false,
                allowOnlyWhitespace: false
            },
            {   fieldLabel: 'Password',
                name: 'passwd',
                emptyText: 'password',
                allowBlank: false,
                allowOnlyWhitespace: false
            },
            {   fieldLabel: 'Full Name',
                name: 'fullname',
                emptyText: 'full name',
                maxLength: 64
            },
            {   fieldLabel: 'Email',
                name: 'email',
                emptyText: 'username@org.com',
                maxLength: 64,
                vtype: 'email'
            },
            {   fieldLabel: 'Phone',
                name: 'phone',
                emptyText: 'xxx-xxx-xxxx'
            },
//            {
//                xtype: 'datefield',
//                name: 'date',
//                format: 'm/d/Y',
//                value: new Date(),
//                hidden: true
//            },
            {
                xtype:'checkbox',
                fieldLabel: 'Sales',
                name: 'sales'
            },
            {
                xtype:'checkbox',
                fieldLabel: 'Admin',
                name: 'admin'
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
    }
});
