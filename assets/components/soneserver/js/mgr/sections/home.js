sOneServer.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'soneserver-panel-home',
            renderTo: 'soneserver-panel-home-div'
        }]
    });
    sOneServer.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer.page.Home, MODx.Component);
Ext.reg('soneserver-page-home', sOneServer.page.Home);