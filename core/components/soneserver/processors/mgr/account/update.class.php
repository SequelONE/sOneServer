<?php

class sOneServerAccountUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'sOneServerAccount';
    public $classKey = 'sOneServerAccount';
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
        $manager = trim($this->getProperty('manager'));
        if (empty($id)) {
            return $this->modx->lexicon('soneserver_account_err_ns');
        }

        if (empty($manager)) {
            $this->modx->error->addField('manager', $this->modx->lexicon('soneserver_account_err_manager'));
        } elseif ($this->modx->getCount($this->classKey, ['manager' => $manager, 'id:!=' => $id])) {
            $this->modx->error->addField('manager', $this->modx->lexicon('soneserver_account_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'sOneServerAccountUpdateProcessor';
