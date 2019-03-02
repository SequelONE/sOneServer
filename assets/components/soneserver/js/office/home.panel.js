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
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: false,
            hideMode: 'offsets',
            items: [{
                title: _('soneserver_items'),
                layout: 'anchor',
                items: [{
                    html: _('soneserver_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'soneserver-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    sOneServer.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.panel.Home, MODx.Panel);
Ext.reg('soneserver-panel-home', sOneServer.panel.Home);
