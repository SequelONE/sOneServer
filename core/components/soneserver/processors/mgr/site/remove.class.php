<?php

class sOneServerSiteRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'sOneServerSite';
    public $classKey = 'sOneServerSite';
    public $languageTopics = ['soneserver'];
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('soneserver_site_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var sOneServerSite $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('soneserver_site_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'sOneServerSiteRemoveProcessor';