<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/sOneServer/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/soneserver')) {
            $cache->deleteTree(
                $dev . 'assets/components/soneserver/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/soneserver/', $dev . 'assets/components/soneserver');
        }
        if (!is_link($dev . 'core/components/soneserver')) {
            $cache->deleteTree(
                $dev . 'core/components/soneserver/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/soneserver/', $dev . 'core/components/soneserver');
        }
    }
}

return true;