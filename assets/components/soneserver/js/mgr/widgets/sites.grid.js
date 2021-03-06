sOneServer.grid.Sites = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-grid-sites';
    }
    Ext.applyIf(config, {
        url: sOneServer.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/site/getlist'
        },
        save_action: 'mgr/site/updateversion',
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateSite(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'soneserver-grid-row-disabled'
                    : '';
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    sOneServer.grid.Sites.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(sOneServer.grid.Sites, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = sOneServer.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuSite(menu);
    },

    createSite: function (btn, e) {
        var w = MODx.load({
            xtype: 'soneserver-site-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },

    updateSite: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/site/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'soneserver-site-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    removeSite: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('soneserver_sites_remove')
                : _('soneserver_site_remove'),
            text: ids.length > 1
                ? _('soneserver_sites_remove_confirm')
                : _('soneserver_site_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/site/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    disableSite: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/site/disable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    enableSite: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/site/enable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    updateVersionSite: function(response) {
        Ext.Msg.confirm(
            _('soneserver_action_download') || _('warning'),
            _('soneserver_confirm_download'),
            function(e) {
                if (e == 'yes') {
                    this.setActionUpdateVersion('download', 'false', 0);
                } else {
                    this.fireEvent('cancel');
                }
            },this);
    },

    getFields: function () {
        return ['id', 'name', 'domain', 'protocol', 'modx_site_version', 'modx_new_version', 'update', 'client', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('soneserver_site_id'),
            dataIndex: 'id',
            sortable: true,
            width: 50
        }, {
            header: _('soneserver_site_name'),
            dataIndex: 'name',
            sortable: true,
            width: 100,
        }, {
            header: _('soneserver_site_domain'),
            dataIndex: 'domain',
            sortable: false,
            width: 100,
        }, {
            header: _('soneserver_site_protocol'),
            dataIndex: 'protocol',
            sortable: false,
            width: 70,
        }, {
            header: _('soneserver_site_modx_site_version'),
            dataIndex: 'modx_site_version',
            sortable: false,
            width: 80,
        }, {
            header: _('soneserver_site_modx_new_version'),
            dataIndex: 'modx_new_version',
            sortable: false,
            width: 80,
        }, {
            header: _('soneserver_site_supdate'),
            dataIndex: 'update',
            renderer: sOneServer.utils.renderBoolean,
            sortable: true,
            width: 70,
        }, {
            header: _('soneserver_site_client'),
            dataIndex: 'client',
            sortable: false,
            width: 100,
        }, {
            header: _('soneserver_site_active'),
            dataIndex: 'active',
            renderer: sOneServer.utils.renderBoolean,
            sortable: true,
            width: 100,
        }, {
            header: _('soneserver_grid_actions'),
            dataIndex: 'actions',
            renderer: sOneServer.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-cogs"></i> ',
            menu: [{
                text: '<i class="icon icon-download"></i> ' + _('soneserver_site_updated'),
                cls: 'soneserver-cogs',
                handler: this.updateVersionSite,
                scope: this
            }, '-', {
                text: '<i class="icon icon-plus"></i> ' + _('soneserver_site_create'),
                cls: 'soneserver-cogs',
                handler: this.createSite,
                scope: this
            }, {
                text: '<i class="icon icon-trash-o red"></i> ' + _('soneserver_site_remove'),
                cls: 'soneserver-cogs',
                handler: this.removeSite,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-on green"></i> ' + _('soneserver_site_active'),
                cls: 'soneserver-cogs',
                handler: this.enableSite,
                scope: this
            }, {
                text: '<i class="icon icon-toggle-off red"></i> ' + _('soneserver_site_disable'),
                cls: 'soneserver-cogs',
                handler: this.disableSite,
                scope: this
            }]
        }, '->', {
            xtype: 'soneserver-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }];
    },

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    setActionUpdateVersion: function(method, field, value) {
        
        MODx.Ajax.request({
            url: sOneServer.config.connector_url,
            params: {
                action: 'mgr/site/updateversion',
                method: method,
                field_name: field,
                field_value: value
            },
            listeners: {
                success: {
                    fn: function() {
                        this.refresh();
                    },
                    scope: this
                },
                failure: {
                    fn: function(response) {
                        MODx.msg.alert(_('error'), response.message);
                    },
                    scope: this
                }
            }
        })
    },

    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    },
});
Ext.reg('soneserver-grid-sites', sOneServer.grid.Sites);
