sOneServer.window.CreateMysql = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-mysql-window-create';
    }
    Ext.applyIf(config, {
        title: _('soneserver_mysql_create'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/mysql/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.CreateMysql.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.CreateMysql, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_host'),
            name: 'host',
            id: config.id + '-host',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_port'),
            name: 'port',
            id: config.id + '-port',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_mysql_port'),
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_mysql_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-mysql-window-create', sOneServer.window.CreateMysql);


sOneServer.window.UpdateMysql = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-mysql-window-update';
    }
    Ext.applyIf(config, {
        title: _('soneserver_mysql_update'),
        width: 550,
        autoHeight: true,
        url: sOneServer.config.connector_url,
        action: 'mgr/mysql/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    sOneServer.window.UpdateMysql.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.window.UpdateMysql, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_host'),
            name: 'host',
            id: config.id + '-host',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_port'),
            name: 'port',
            id: config.id + '-port',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_login'),
            name: 'login',
            id: config.id + '-login',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: _('soneserver_mysql_password'),
            name: 'password',
            id: config.id + '-password',
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'soneserver-combo-site',
            fieldLabel: _('soneserver_mysql_port'),
            anchor: '99%',
            allowBlank: true,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('soneserver_mysql_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('soneserver-mysql-window-update', sOneServer.window.UpdateMysql);