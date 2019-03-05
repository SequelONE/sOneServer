<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var sOneServer $sOneServer */
$sOneServer = $modx->getService('sOneServer', 'sOneServer', MODX_CORE_PATH . 'components/soneserver/model/');
$modx->lexicon->load('soneserver:default');

// handle request
$corePath = $modx->getOption('soneserver_core_path', null, $modx->getOption('core_path') . 'components/soneserver/');
$path = $modx->getOption('processorsPath', $sOneServer->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);