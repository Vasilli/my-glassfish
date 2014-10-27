
Ext.define('Exxact.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    xtype: 'mainmenu',
    layout: {
        type: 'border'
    },

    items: [
        // <editor-fold defaultstate="collapsed" desc="north">
        {
            region: 'north',
            margins: 5,
            height: 50,
            xtype: 'container'
        },
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="west">
//            {
//                region: 'west',
//                title: 'Menu',
//                margins: '0 5 0 5',
//                flex: .1,
//                collapsible: true,
//                split: true
//            },
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="center">
        {
            region: 'center',
            xtype: 'navigationtabs',
            layout: 'fit'
        },
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="east">
//    {
//        region: 'east',
//        title: 'East',
//        margins: '0 5 0 5',
//        flex: .2,
//        collapsible: true,
//        collapsed: true,
//        titleCollapse: true
//    },
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="south">
        {
            region: 'south',
            margins: '0 2 2 2',
            flex: .1,
            split: true,
            collapsible: true,
            collapsed: true
        }
        // </editor-fold>
    ]
});