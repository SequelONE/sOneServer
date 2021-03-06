<?php

class sOneServerFtpDisableProcessor extends modObjectProcessor
{
    public $objectType = 'sOneServerFtp';
    public $classKey = 'sOneServerFtp';
    public $languageTopics = ['soneserver'];
    //public $permission = 'save';


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
            return $this->failure($this->modx->lexicon('soneserver_ftp_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var sOneServerFtp $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('soneserver_ftp_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'sOneServerFtpDisableProcessor';
