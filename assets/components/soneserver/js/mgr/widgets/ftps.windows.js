sOneServer.window.CreateFtp = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-ftp-window-create';
    }
    Ext.applyIf(config, {
        title: _('soneserver_ftp_create'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/ftp/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.CreateFtp.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.CreateFtp, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_host'),
            name: 'host',
            id: config.id + '-host',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_port'),
            name: 'port',
            id: config.id + '-port',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_path'),
            name: 'path',
            id: config.id + '-path',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_ftp_site'),
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_ftp_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-ftp-window-create', sOneServer.window.CreateFtp);


sOneServer.window.UpdateFtp = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-ftp-window-update';
    }
    Ext.applyIf(config, {
        title: _('soneserver_ftp_update'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/ftp/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.UpdateFtp.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.UpdateFtp, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_host'),
            name: 'host',
            id: config.id + '-host',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_port'),
            name: 'port',
            id: config.id + '-port',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_ftp_path'),
            name: 'path',
            id: config.id + '-path',
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_ftp_site'),
            anchor: '99%',
            allowBlank: true
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_ftp_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-ftp-window-update', sOneServer.window.UpdateFtp);