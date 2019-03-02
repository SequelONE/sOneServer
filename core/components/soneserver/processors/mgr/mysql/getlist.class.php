<?php

class sOneServerMysqlGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'sOneServerMysql';
    public $classKey = 'sOneServerMysql';
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

        $c->leftJoin('sOneServerSite', 'sOneServerSite', 'sOneServerSite.id = sOneServerMysql.site');
        $c->select(array($this->modx->getSelectColumns('sOneServerMysql', 'sOneServerMysql')));
        $c->select(array('sOneServerSite.domain as site_name'));

        if ($query) {
            $c->where([
                'host:LIKE' => "%{$query}%",
                'OR:port:LIKE' => "%{$query}%",
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
            'title' => $this->modx->lexicon('soneserver_mysql_update'),
            //'multiple' => $this->modx->lexicon('soneserver_mysqls_update'),
            'action' => 'updateMysql',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('soneserver_mysql_enable'),
                'multiple' => $this->modx->lexicon('soneserver_mysqls_enable'),
                'action' => 'enableMysql',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('soneserver_mysql_disable'),
                'multiple' => $this->modx->lexicon('soneserver_mysqls_disable'),
                'action' => 'disableMysql',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('soneserver_mysql_remove'),
            'multiple' => $this->modx->lexicon('soneserver_mysqls_remove'),
            'action' => 'removeMysql',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'sOneServerMysqlGetListProcessor';