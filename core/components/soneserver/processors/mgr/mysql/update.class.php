<?php

class sOneServerMysqlUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'sOneServerMysql';
    public $classKey = 'sOneServerMysql';
    public $languageTopics = ['soneserver'];
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $host = trim($this->getProperty('host'));
        if (empty($id)) {
            return $this->modx->lexicon('soneserver_mysql_err_ns');
        }

        if (empty($host)) {
            $this->modx->error->addField('name', $this->modx->lexicon('soneserver_mysql_err_host'));
        } elseif ($this->modx->getCount($this->classKey, ['host' => $host, 'id:!=' => $id])) {
            $this->modx->error->addField('name', $this->modx->lexicon('soneserver_mysql_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'sOneServerMysqlUpdateProcessor';
