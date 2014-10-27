
Ext.define('Exxact.view.Login', {
    extend: 'Ext.window.Window',

    xtype: 'loginview',

    iconCls: 'login_key',
    title: 'Login',
    height: 180,
    width: 360,
    resizable: false,
    modal: true,
    frame: true,
    autoShow: true,
    closable: false,

    layout: {
        type: 'fit'
    },

    initComponent: function() {
        var me = this;

        // <editor-fold defaultstate="collapsed" desc="me.items">
        me.items = [{
            xtype: 'form',
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 60,
                maxLength: 32,
                allowBlank: false,
                allowOnlyWhitespace: false
            },
            items:[
            {   fieldLabel: 'User',
                name: 'user'
                
            },
            {   fieldLabel: 'Password',
                name: 'passwd',
                inputType: 'password',
                id: 'passwd',
                enableKeyEvents: true
            }]
        }],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="me.bbar">
        me.bbar = [{
            xtype: 'tbtext',
            text: ' © 1992 - present. ExxactCorp.'
        }],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="me.buttons">
        me.buttons = [{
            itemId: 'login',
            text: 'Login',
            iconCls: 'key_go'
        }],
        // </editor-fold>
        me.callParent(arguments);
    }
});

