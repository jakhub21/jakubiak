<?php

/** @var \App\Model\Ship $ship */
/** @var \App\Service\Router $router */

$title = "Edit Ship {$ship->getBrand()} ({$ship->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('ship-edit') ?>" method="ship" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="ship-edit">
        <input type="hidden" name="id" value="<?= $ship->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('ship-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('ship-delete') ?>" method="ship">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="ship-delete">
                <input type="hidden" name="id" value="<?= $ship->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
