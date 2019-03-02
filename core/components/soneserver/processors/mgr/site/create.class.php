<?php

class sOneServerSiteCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'sOneServerSite';
    public $classKey = 'sOneServerSite';
    public $languageTopics = ['soneserver'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('soneserver_site_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('soneserver_site_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'sOneServerSiteCreateProcessor';