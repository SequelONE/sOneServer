<?php

define('MODX_API_MODE', true);
require_once($_SERVER['DOCUMENT_ROOT'] . '/index.php');
$modx=new modX();
$modx->initialize('web');

// Включаем обработку ошибок
$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

$modx->addPackage('soneserver', $modx->getOption('core_path') . 'components/soneserver/model/');

$sites = $modx->getCollection('sOneServerSite');
foreach ($sites as $site => $domain) {
    if (!$object = $modx->getObject('sOneServerSite', ['domain' => $domain])) {

        $object = $modx->newObject('sOneServerSite');
        $object->set('domain', $domain);

    }

    $url = $object->get('protocol').'://'.$object->get('domain').'/assets/components/soneclient/version.php';

    $json = file_get_contents($url);
    $version = json_decode($json);
    $sitemodxversion = $version->site_modx_version;
    $newmodxversion = $version->new_modx_version;

    $object->set('modx_site_version', $sitemodxversion);
    $object->set('modx_new_version', $newmodxversion);
    if($sitemodxversion == $newmodxversion) {
        $object->set('update', 0);
    } else {
        $object->set('update', 1);
    }

    $object->save();
}