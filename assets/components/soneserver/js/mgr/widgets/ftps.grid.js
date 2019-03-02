sOneServer.grid.Ftps = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'soneserver-grid-ftps';
    }
    Ext.applyIf(config, {
        url: sOneServer.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/ftp/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateFtp(grid, e, row);
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
    sOneServer.grid.Ftps.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(sOneServer.grid.Ftps, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = sOneServer.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuFtp(menu);
    },

    createFtp: function (btn, e) {
        var w = MODx.load({
            xtype: 'soneserver-ftp-window-create',
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

    updateFtp: function (btn, e, row) {
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
                action: 'mgr/ftp/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'soneserver-ftp-window-update',
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

    removeFtp: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('soneserver_ftps_remove')
                : _('soneserver_ftp_remove'),
            text: ids.length > 1
                ? _('soneserver_ftps_remove_confirm')
                : _('soneserver_ftp_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/ftp/remove',
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

    disableFtp: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/ftp/disable',
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

    enableFtp: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/ftp/enable',
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

    getFields: function () {
        return ['id', 'host', 'port', 'login', 'password', 'path', 'site_name', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('soneserver_ftp_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: _('soneserver_ftp_host'),
            dataIndex: 'host',
            sortable: true,
            width: 150,
        }, {
            header: _('soneserver_ftp_port'),
            dataIndex: 'port',
            sortable: false,
            width: 70,
        }, {
            header: _('soneserver_ftp_login'),
            dataIndex: 'login',
            sortable: false,
            width: 100,
        }, {
            header: _('soneserver_ftp_password'),
            dataIndex: 'password',
            sortable: false,
            width: 100,
        }, {
            header: _('soneserver_ftp_path'),
            dataIndex: 'path',
            sortable: false,
            width: 150,
        }, {
            header: _('soneserver_ftp_site'),
            dataIndex: 'site_name',
            sortable: false,
            width: 150,
        }, {
            header: _('soneserver_ftp_active'),
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
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('soneserver_ftp_create'),
            handler: this.createFtp,
            scope: this
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
Ext.reg('soneserver-grid-ftps', sOneServer.grid.Ftps);
