<?php

class sOneServerOfficeItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'sOneServerItem';
    public $classKey = 'sOneServerItem';
    public $languageTopics = ['soneserver'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('soneserver_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('soneserver_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'sOneServerOfficeItemCreateProcessor';