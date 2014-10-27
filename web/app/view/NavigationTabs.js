
Ext.define('Exxact.view.NavigationTabs', {
    extend: 'Ext.tab.Panel',

    xtype: 'navigationtabs',

    controller: 'changetabs',

    defaults: {
        autoScroll: true
    },
    tabPosition: 'left',
    tabRotation: 0,

    // <editor-fold defaultstate="collapsed" desc="items">
    items: [
    {
        title: 'Progress',
        html:
            '<div>' +
            '<h3>Need:</h3>' +
            '<ul>' +
                '<li/>Add Quote List' +
                '<li/>Add Quote' +
                '<li/>Update Quote' +
                '<li/>Delete Quote' +
                '<li/>Search Quote by Quote,Customer Name,CustomerID,MFR PN,Name,Part Description,System Template' +
                '<li/>Dublicate Quote' +
                '<li/>Add Customer Quote' +
                '<li/>Add Customer ECO' +
                '<li/>Parts External Price List' +
                '<li/>Quote Edit/Save pdf' +
                '<li/>Quote GP' +
                '<li/>Quote Markap/Margin' +
                '<li/>Search Parts by Description and Category' +
                '<li/>ECO List' +
                '<li/>ECO User' +
                '<li/>Update ECO' +
                '<li/>Delete ECO' +
                '<li/>Tools' +
            '</ul>' +
            '<h3>Done:</h3>' +
            '<ul>' +
                '<li/>Login page' +
                '<li/>Users List' +
                '<li/>Add User' +
                '<li/>Update User' +
                '<li/>Delete User' +
                '<li/>Search Users' +
                '<li/>Parts List' +
                '<li/>Add Parts' +
                '<li/>Update Parts' +
                '<li/>Search Parts MFR PN' +
                '<li/>Customer List' +
                '<li/>Add Customer' +
                '<li/>Update Customer' +
                '<li/>Delete Customer' +
                '<li/>Search Customer' +
            '</ul>' +
            '</div>'
    },
    {
        title: 'Customer Profile',
        xtype: 'customersList'
        //iconCls: 'icon_group'
    },
    {
        title: 'Quotes',
        xtype: 'quotesList'
    },
    {
        title: 'Parts',
        xtype: 'partsList'
    },
    {
        title: 'ECO',
        //xtype: 'quotesList',
        disabled: true
    },
    {
        title: 'Tools',
        //xtype: 'quotesList',
        disabled: true
    },
    {
        title: 'Users',
        xtype: 'usersList'
        //iconCls: 'icon_group'
    }
//    {
//        title: 'Articles',
//        xtype: 'articlesList'
//    }
    ],
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="listeners">
    listeners: {
        tabchange: 'onTabChange',
        scope: 'controller'
    }
    // </editor-fold>
});