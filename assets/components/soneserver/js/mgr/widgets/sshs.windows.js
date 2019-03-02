sOneServer.window.CreateSsh = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-ssh-window-create';
    }
    Ext.applyIf(config, {
        title: _('soneserver_ssh_create'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/ssh/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.CreateSsh.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.CreateSsh, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('soneserver_ssh_host'),
            name: 'host',
            id: config.id + '-host',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ssh_port'),
            name: 'port',
            id: config.id + '-port',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ssh_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ssh_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ssh_path'),
            name: 'path',
            id: config.id + '-path',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_ssh_site'),
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_ssh_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-ssh-window-create', sOneServer.window.CreateSsh);


sOneServer.window.UpdateSsh = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-ssh-window-update';
    }
    Ext.applyIf(config, {
        title: _('soneserver_ssh_update'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/ssh/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.UpdateSsh.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.UpdateSsh, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ssh_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('soneserver_ssh_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%',
            height: 150,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_ssh_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-ssh-window-update', sOneServer.window.UpdateSsh);