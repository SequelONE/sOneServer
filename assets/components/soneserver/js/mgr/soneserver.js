var sOneServer = function (config) {
    config = config || {};
    sOneServer.superclass.constructor.call(this, config);
};
Ext.extend(sOneServer, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('soneserver', sOneServer);

sOneServer = new sOneServer();