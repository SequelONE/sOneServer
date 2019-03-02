<?php

class sOneServerAccountGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'sOneServerAccount';
    public $classKey = 'sOneServerAccount';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));

        $c->leftJoin('sOneServerSite', 'sOneServerSite', 'sOneServerSite.id = sOneServerAccount.site');
        $c->select(array($this->modx->getSelectColumns('sOneServerAccount', 'sOneServerAccount')));
        $c->select(array('sOneServerSite.domain as site_name'));

        if ($query) {
            $c->where([
                'manager:LIKE' => "%{$query}%",
                'OR:login:LIKE' => "%{$query}%",
            ]);
        }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('soneserver_account_update'),
            //'multiple' => $this->modx->lexicon('soneserver_accounts_update'),
            'action' => 'updateAccount',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('soneserver_account_enable'),
                'multiple' => $this->modx->lexicon('soneserver_accounts_enable'),
                'action' => 'enableAccount',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('soneserver_account_disable'),
                'multiple' => $this->modx->lexicon('soneserver_accounts_disable'),
                'action' => 'disableAccount',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('soneserver_account_remove'),
            'multiple' => $this->modx->lexicon('soneserver_accounts_remove'),
            'action' => 'removeAccount',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'sOneServerAccountGetListProcessor';