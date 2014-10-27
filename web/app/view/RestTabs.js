
Ext.define('Exxact.view.RestTabs', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.changetabs',

    onTabChange: function(tabPanel, newItem, oldItem) {
        var store = newItem.getStore();
        if(!store.isLoaded()) {
            store.load();
        }
    }
});
