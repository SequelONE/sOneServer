<?php

class sOneServerAccountCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'sOneServerAccount';
    public $classKey = 'sOneServerAccount';
    public $languageTopics = ['soneserver'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $manager = trim($this->getProperty('manager'));
        if (empty($manager)) {
            $this->modx->error->addField('manager', $this->modx->lexicon('soneserver_account_err_manager'));
        } elseif ($this->modx->getCount($this->classKey, ['manager' => $manager])) {
            $this->modx->error->addField('manager', $this->modx->lexicon('soneserver_account_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'sOneServerAccountCreateProcessor';