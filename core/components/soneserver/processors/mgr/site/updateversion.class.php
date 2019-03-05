<?php

/**
 * Update Sites
 */
class sOneServerSiteUpdateVersionProcessor extends modProcessor
{
    public $objectType = 'sOneServerSite';
    public $classKey = 'sOneServerSite';
    public $languageTopics = ['soneserver'];

    /** {@inheritDoc} */
    public function process()
    {
        $this->modx->addPackage('soneserver', $this->modx->getOption('core_path') . 'components/soneserver/model/');

        $sites = $this->modx->getCollection('sOneServerSite');

        foreach($sites as $site => $domain) {

            if (!$object = $this->modx->getObject('sOneServerSite', ['domain' => $domain])) {

                $object = $this->modx->newObject('sOneServerSite');
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

        return $this->success();
    }

}

return 'sOneServerSiteUpdateVersionProcessor';