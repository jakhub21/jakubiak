<?php

/** @var \App\Model\Ship $ship */
/** @var \App\Service\Router $router */

$title = 'Add Ship';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Ship</h1>
    <form action="<?= $router->generatePath('ship-create') ?>" method="ship" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="ship-create">
    </form>

    <a href="<?= $router->generatePath('ship-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
