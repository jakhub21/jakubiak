<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Ship;
use App\Service\Router;
use App\Service\Templating;

class PostController
{
    public function indexAction(Templating $templating, Router $router): ?string{
        $ships = Ship::findAll();
        $html = $templating->render('ship/index.html.php', [
            'ships' => $ships,
            'router' => $router,
        ]);
        return $html;
    }
    public function showAction(int $shipid, Templating $templating, Router $router): ?string{
        $ship = Ship::find($shipid);
        if (! $ship) {
            throw new NotFoundException("Missing ship with id $shipid");
        }
        $html = $templating->render('ship/show.html.php', [
            'ship' => $ship,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $rShip, Templating $templating, Router $router): ?string{
        if ($rShip) {
            $ship = Ship::fromArray($rShip);
            $ship->save();
            $path = $router->generatePath("ship-index");
            $router->redirect($path);
//            return null;
        }
        else {
            $ship = new Ship();
        }
        $html = $templating->render('ship/create.html.php', [
            'ship' => $ship,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $shipid, ?array $rShip, Templating $templating, Router $router): ?string{
        $ship = Ship::find($shipid);
        if (! $ship) {
            throw new NotFoundException("Missing ship with id $shipid");
        }
        if ($rShip) {
            $ship->fill($rShip);
            $ship->save();
            $path = $router->generatePath("ship-index");
            $router->redirect($path);
            return null;
        }
        $html = $templating->render('ship/edit.html.php', [
            'ship' => $ship,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $shipid, Router $router): ?string{
        $ship = Ship::find($shipid);
        if (! $ship) {
            throw new NotFoundException("Missing car with id $shipid");
        }
        $ship->delete();
        $path = $router->generatePath("ship-index");
        $router->redirect($path);
        return null;
    }
}
