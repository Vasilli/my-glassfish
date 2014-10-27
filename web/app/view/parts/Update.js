
Ext.define('Exxact.view.parts.Update', {
    extend: 'Ext.window.Window',

    xtype: 'partUpdate',

    iconCls: 'parts_edit',
    title: 'Update Part',
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
            {
                xtype: 'combo',
                fieldLabel: 'Category',
                name: 'cat',
                emptyText: 'select category',
                store: Ext.create('Exxact.store.CategoriesWidgets'),
                valueField: 'cat_id',
                displayField: 'cat_name',
                queryParam: 'search',
                typeAhead: true,
                typeAheadDelay: 100,
                pageSize: 1,
                minChars: 2,
                autoLoadOnValue: true,
                listeners: {
                    scope: this,
                    change: this.onChangeGridCategoryName
                }
            },
            {   name: 'cat_name',
                hidden: true
            },
            {   fieldLabel: 'Part Number',
                name: 'mfr_pn',
                emptyText: 'part number',
                fieldStyle: 'text-transform:uppercase'
            },
            {   fieldLabel: 'Ingram SKU',
                name: 'ingramSKU',
                emptyText: 'ingram SKU'
            },
            {   fieldLabel: 'Cost',
                name: 'cost',
                emptyText: '$0.00',
                listeners: {
                    scope: this,
                    change: this.onFixUsMoney,
                    blur:   this.onFixUsMoney
                }
            },
            {   xtype: 'textarea',
                name: 'description',
                emptyText: 'Description',
                maxLength : 255,
                height: 120,
                hideLabel: true
            }]
        }],
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="me.buttons">
        me.buttons = [{
            itemId: 'save',
            text: 'Update'
        }, {
            text: 'Cancel',
            scope: me,
            handler: me.close
        }],
        // </editor-fold>
        me.callParent(arguments);
    },
    // <editor-fold defaultstate="collapsed" desc="onSetCatName">
    onChangeGridCategoryName: function(field) {

        var catName = this.down('[name=cat_name]');
        catName.setValue(field.getRawValue());
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="onFixUsMoney">
    onFixUsMoney: function(field) {

        var newValue = field.value; 
        var oldValue = field.value; 
        newValue = Ext.util.Format.usMoney(newValue.replace(/[^0-9\.]/g, ''));
        if(newValue === '$NaN.00') {
            field.setValue(oldValue);
        }
        else {
            field.setValue(newValue);
        }
    }
    // </editor-fold>
});
