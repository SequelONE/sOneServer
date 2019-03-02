<?php

class sOneServerMysqlRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'sOneServerMysql';
    public $classKey = 'sOneServerMysql';
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
            return $this->failure($this->modx->lexicon('soneserver_mysql_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var sOneServerMysql $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('soneserver_mysql_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'sOneServerMysqlRemoveProcessor';