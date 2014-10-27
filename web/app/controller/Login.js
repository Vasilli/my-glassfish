
Ext.define('Exxact.controller.Login', {
    extend: 'Ext.app.Controller',
    
    views: [
        'Login',
        'authentication.CapsLockTooltip'
    ],
    refs: [
        {
            ref: 'capslockTooltip',
            selector: 'capslocktooltip'
        }
    ],

    init: function() {
        var me = this;

        me.control({
            'loginview button#login': {
                click: me.onLoginClick
            },
            'loginview form textfield[name=passwd]': {
                keypress: me.onTextfieldKeyPress
            }
        });
    },

    // <editor-fold defaultstate="collapsed" desc="onLoginClick">
    onLoginClick: function(button) {

        var win = button.up('window');
        var form = win.down('form');

        if(form.isValid()) {
            var values = form.getValues();
            // check if the username and password is valid

            Ext.get(win.getEl()).mask("Authenticating... Please wait...", 'loading');

            Ext.Ajax.request({
                url: '/quotes/what?do=login',
                method: 'GET',
                params: {
                    user: values.user,
                    passwd: Exxact.utils.MD5.encode(values.passwd)
                },
                success: function(resp){

                    var result = Ext.JSON.decode(resp.responseText, true);
                    if(!result) {
                        result = {};
                        result.success = false;
                        result.msg = resp.responseText;
                    }

                    if(result.success) {

                        Ext.get(win.getEl()).unmask();
                        win.destroy();

                        // set name to cookie
                        Ext.util.Cookies.set('user', Ext.encode(result.user));

                        Ext.create('Exxact.view.MyViewport');
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Error!',
                            msg: result.msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });

                        Ext.get(win.getEl()).unmask();
                    }
                }
            });
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onTextfieldKeyPress">
    onTextfieldKeyPress: function(field, e, options) {

        var charCode = e.getCharCode();

        if((e.shiftKey  && charCode >= 97 && charCode <= 122) ||
           (!e.shiftKey && charCode >= 65 && charCode <= 90)) { // user has pressed one of the capital alpha keys (A-Z)

            if(this.getCapslockTooltip() === undefined) {
                Ext.widget('capslocktooltip');
            }
            this.getCapslockTooltip().show();
        }
        else {
            if(this.getCapslockTooltip() !== undefined){
                this.getCapslockTooltip().hide();
            }
        }
    }
    // </editor-fold>
});
