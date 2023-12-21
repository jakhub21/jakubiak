<?php

/** @var \App\Model\Ship $ship */
/** @var \App\Service\Router $router */

$title = "{$ship->getBrand()} ({$ship->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $ship->getBrand() ?></h1>
    <article>
        <?= $ship->getVersion();?>
    </article>
    <article>
        <?= $ship->getEquipment();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('ship-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('ship-edit', ['id'=> $ship->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
