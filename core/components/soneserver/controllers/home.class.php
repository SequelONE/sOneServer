<?php

/**
 * The home manager controller for sOneServer.
 *
 */
class sOneServerHomeManagerController extends modExtraManagerController
{
    /** @var sOneServer $sOneServer */
    public $sOneServer;


    /**
     *
     */
    public function initialize()
    {
        $this->sOneServer = $this->modx->getService('sOneServer', 'sOneServer', MODX_CORE_PATH . 'components/soneserver/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['soneserver:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('soneserver');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->sOneServer->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/soneserver.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/accounts.grid.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/accounts.windows.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/ftps.grid.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/ftps.windows.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/mysqls.grid.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/mysqls.windows.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/sites.grid.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/sites.windows.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/sshs.grid.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/sshs.windows.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->sOneServer->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        sOneServer.config = ' . json_encode($this->sOneServer->config) . ';
        sOneServer.config.connector_url = "' . $this->sOneServer->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "soneserver-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="soneserver-panel-home-div"></div>';

        return '';
    }
}