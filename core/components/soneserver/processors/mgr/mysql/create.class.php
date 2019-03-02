<?php

class sOneServerMysqlCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'sOneServerMysql';
    public $classKey = 'sOneServerMysql';
    public $languageTopics = ['soneserver'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('host'));
        if (empty($name)) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_mysql_err_host'));
        } elseif ($this->modx->getCount($this->classKey, ['host' => $name])) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_mysql_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'sOneServerMysqlCreateProcessor';