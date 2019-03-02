<?php

class sOneServerFtpCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'sOneServerFtp';
    public $classKey = 'sOneServerFtp';
    public $languageTopics = ['soneserver'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $host = trim($this->getProperty('host'));
        if (empty($host)) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_ftp_err_host'));
        } elseif ($this->modx->getCount($this->classKey, ['host' => $host])) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_ftp_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'sOneServerFtpCreateProcessor';