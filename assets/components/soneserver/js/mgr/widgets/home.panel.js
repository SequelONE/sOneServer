sOneServer.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'soneserver-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('soneserver') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('soneserver_sites'),
                layout: 'anchor',
                items: [{
                    html: _('soneserver_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'soneserver-grid-sites',
                    cls: 'main-wrapper',
                }]
            }, {
                title: _('soneserver_accounts'),
                layout: 'anchor',
                items: [{
                    html: _('soneserver_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'soneserver-grid-accounts',
                    cls: 'main-wrapper',
                }]
            }, {
                title: _('soneserver_ftps'),
                layout: 'anchor',
                items: [{
                    html: _('soneserver_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'soneserver-grid-ftps',
                    cls: 'main-wrapper',
                }]
            }, {
                title: _('soneserver_sshs'),
                layout: 'anchor',
                items: [{
                    html: _('soneserver_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'soneserver-grid-sshs',
                    cls: 'main-wrapper',
                }]
            }, {
                title: _('soneserver_mysqls'),
                layout: 'anchor',
                items: [{
                    html: _('soneserver_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'soneserver-grid-mysqls',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    sOneServer.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.panel.Home, MODx.Panel);
Ext.reg('soneserver-panel-home', sOneServer.panel.Home);
