sOneServer.window.CreateAccount = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-account-window-create';
    }
    Ext.applyIf(config, {
        title: _('soneserver_account_create'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/account/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.CreateAccount.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.CreateAccount, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('soneserver_account_manager'),
            name: 'manager',
            id: config.id + '-manager',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_account_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_account_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_account_site'),
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_account_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-account-window-create', sOneServer.window.CreateAccount);


sOneServer.window.UpdateAccount = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-account-window-update';
    }
    Ext.applyIf(config, {
        title: _('soneserver_account_update'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/account/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.UpdateAccount.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.UpdateAccount, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_account_manager'),
            name: 'manager',
            id: config.id + '-manager',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_account_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_account_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_account_site'),
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_account_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-account-window-update', sOneServer.window.UpdateAccount);