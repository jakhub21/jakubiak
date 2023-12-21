<?php
    /** @var $ship ?\App\Model\Ship */
?>

<div class="form-group">
    <label for="shipName">Ship Name</label>
    <input type="text" id="brand" name="ship[brand]" value="<?= $ship ? $ship->getBrand() : '' ?>">
</div>

<div class="form-group">
    <label for="version">Brand</label>
    <textarea id="version" name="ship[version]"><?= $ship? $ship->getVersion() : '' ?></textarea>
</div>

<div class="form-group">
    <label for="equipment">Equipment</label>
    <textarea id="equipment" name="ship[equipment]"><?= $ship? $ship->getEquipment() : '' ?></textarea>
</div>


<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
