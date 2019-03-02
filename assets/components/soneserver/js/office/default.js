Ext.onReady(function () {
    sOneServer.config.connector_url = OfficeConfig.actionUrl;

    var grid = new sOneServer.panel.Home();
    grid.render('office-soneserver-wrapper');

    var preloader = document.getElementById('office-preloader');
    if (preloader) {
        preloader.parentNode.removeChild(preloader);
    }
});