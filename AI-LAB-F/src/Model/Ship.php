<?php
namespace App\Model;

use App\Service\Config;

class Ship
{
    private ?int $id = null;
    private ?string $brand = null;
    private ?string $version = null;
    private ?string $equipment = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Ship
    {
        $this->id = $id;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(?string $brand): Ship
    {
        $this->brand = $brand;

        return $this;
    }

    public function getVersion(): ?string
    {
        return $this->version;
    }

    public function setVersion(?string $version): Ship
    {
        $this->version = $version;

        return $this;
    }

    public function getEquipment(): ?string
    {
        return $this->equipment ?? 'Nothing special';
    }

    public function setEquipment(?string $equipment): Ship
    {
        $this->equipment = $equipment;

        return $this;
    }

    public static function fromArray($array): Ship
    {
        $ship = new self();
        $ship->fill($array);

        return $ship;
    }

    public function fill($array): Ship
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['brand'])) {
            $this->setBrand($array['brand']);
        }
        if (isset($array['version'])) {
            $this->setVersion($array['version']);
        }
        if (isset($array['equipment'])) {
            $this->setEquipment($array['equipment']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM ship';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $ship = [];
        $shipsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($shipsArray as $shipsArray) {
            $ship[] = self::fromArray($shipsArray);
        }

        return $ship;
    }

    public static function find($id): ?Ship
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM ship WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $shipArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $shipArray) {
            return null;
        }
        $ship = Ship::fromArray($shipArray);

        return $ship;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO ship (brand, version, equipment) VALUES (:brand, :version, :equipment)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'brand' => $this->getBrand(),
                'version' => $this->getVersion(),
                'equipment' => $this->getEquipment(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE ship SET brand = :brand, version = :version, equipment = :equipment WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':brand' => $this->getBrand(),
                ':version' => $this->getVersion(),
                ':equipment' => $this->getEquipment(),
                ':id' => $this->getId(),
            ]);
        }
    }


    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM ship WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setBrand(null);
        $this->setVersion(null);
        $this->setEquipment(null);
    }
}
