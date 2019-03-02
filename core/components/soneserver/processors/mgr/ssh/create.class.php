<?php

class sOneServerSshCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'sOneServerSsh';
    public $classKey = 'sOneServerSsh';
    public $languageTopics = ['soneserver'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('host'));
        if (empty($name)) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_ssh_err_host'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('host', $this->modx->lexicon('soneserver_ssh_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'sOneServerSshCreateProcessor';