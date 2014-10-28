
Ext.define('Exxact.view.users.Update', {
    extend: 'Ext.window.Window',

    xtype: 'userUpdate',

    iconCls: 'user_edit',
    title: 'Update User',
    width: 400,
    resizable: false,
    modal: true,
    frame: true,

    initComponent: function() {
        var me = this;

        // <editor-fold defaultstate="collapsed" desc="me.items">//GEN-BEGIN:initComponents
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
            {   name: 'id',
                hidden: true
            },
            {   fieldLabel: 'Password',
                name: 'passwd',
                emptyText: 'password'
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
            {   xtype:'checkbox',
                fieldLabel: 'Sales',
                name: 'sales'
            },
            {   xtype:'checkbox',
                fieldLabel: 'Admin',
                name: 'admin'
            },
            {   xtype:'checkbox',
                fieldLabel: 'Delete',
                name: 'deleted'
            }]
        }],
        // </editor-fold>//GEN-END:initComponents
        // <editor-fold defaultstate="collapsed" desc="me.buttons">
        me.buttons = [
        {
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
