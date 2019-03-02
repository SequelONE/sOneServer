<?php

class sOneServerFtpUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'sOneServerFtp';
    public $classKey = 'sOneServerFtp';
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
            return $this->modx->lexicon('soneserver_ftp_err_ns');
        }

        if (empty($host)) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_ftp_err_host'));
        } elseif ($this->modx->getCount($this->classKey, ['host' => $host, 'id:!=' => $id])) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_ftp_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'sOneServerFtpUpdateProcessor';
