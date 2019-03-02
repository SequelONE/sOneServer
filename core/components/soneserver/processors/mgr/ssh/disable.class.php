<?php

class sOneServerSshDisableProcessor extends modObjectProcessor
{
    public $objectType = 'sOneServerSsh';
    public $classKey = 'sOneServerSsh';
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
            return $this->failure($this->modx->lexicon('soneserver_ssh_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var sOneServerSsh $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('soneserver_ssh_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'sOneServerSshDisableProcessor';
