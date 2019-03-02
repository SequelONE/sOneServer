sOneServer.window.CreateSite = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-site-window-create';
    }
    Ext.applyIf(config, {
        title: _('soneserver_site_create'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/site/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.CreateSite.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.CreateSite, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_domain'),
            name: 'domain',
            id: config.id + '-domain',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_protocol'),
            name: 'protocol',
            id: config.id + '-protocol',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_modx_site_version'),
            name: 'modx_site_version',
            id: config.id + '-modx_site_version',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_modx_new_version'),
            name: 'modx_new_version',
            id: config.id + '-modx_new_version',
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            fieldLabel: _('soneserver_site_update'),
            name: 'update',
            id: config.id + '-update',
            checked: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_client'),
            name: 'client',
            id: config.id + '-client',
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_site_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-site-window-create', sOneServer.window.CreateSite);


sOneServer.window.UpdateSite = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-site-window-update';
    }
    Ext.applyIf(config, {
        title: _('soneserver_site_update'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/site/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.UpdateSite.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.UpdateSite, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_domain'),
            name: 'domain',
            id: config.id + '-domain',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_protocol'),
            name: 'protocol',
            id: config.id + '-protocol',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_modx_site_version'),
            name: 'modx_site_version',
            id: config.id + '-modx_site_version',
            anchor: '99%'
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_modx_new_version'),
            name: 'modx_new_version',
            id: config.id + '-modx_new_version',
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            fieldLabel: _('soneserver_site_update'),
            name: 'update',
            id: config.id + '-update',
            checked: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_site_client'),
            name: 'client',
            id: config.id + '-client',
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_site_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-site-window-update', sOneServer.window.UpdateSite);