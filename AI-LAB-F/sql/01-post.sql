create table ship
(
    id      integer not null
        constraint ship_pk
            primary key autoincrement,
    brand text not null,
    version text not null,
    equipment text not null
);
