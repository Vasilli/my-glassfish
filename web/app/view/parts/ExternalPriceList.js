
Ext.define('Exxact.view.parts.ExternalPriceList', {
    extend: 'Ext.window.Window',

    xtype: 'partPricePrice',

    iconCls: 'parts_magnify',
    title: 'External Price List',
    width: 800,
    resizable: false,
    modal: true,
    frame: true,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});
