// activate tips
Ext.tip.QuickTipManager.init();
// stae provider for save columns order etc.
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

Ext.application({
    name: 'Exxact',
    appFolder: '/quotes/app',

    enableQuickTips: true,

    // <editor-fold defaultstate="collapsed" desc="requires">
    requires: [
        'Exxact.utils.SearchField',
        'Exxact.utils.MD5'
    ],
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="views">
    views: [
        'MyViewport',
        'NavigationTabs',
        'RestTabs'
    ],
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="controllers">
    controllers: [
        'Login',
        'Customers',
        'Quotes',
        'Quote',
        'Parts',
        'Users'
    ],
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="stores">
    stores: [
        // TODO: add stores here
    ],
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="launch">
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            items:[{
                xtype: 'loginview'
            }]
        });
    }
//    launch: function() {
//        Ext.create('DevJS.lib.form.field.VTypes').init();
//    }
    // </editor-fold>
});

