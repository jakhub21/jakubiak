<?php

/** @var \App\Model\Ship[] $ships */
/** @var \App\Service\Router $router */

$title = 'Ship List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Ships</h1>

    <a href="<?= $router->generatePath('ship-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($ships as $ship): ?>
            <li><h3><?= $ship->getBrand() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('ship-show', ['id' => $ship->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('ship-edit', ['id' => $ship->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
