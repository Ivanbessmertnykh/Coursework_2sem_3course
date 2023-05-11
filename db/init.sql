create schema jpa;
create sequence jpa.hibernate_sequence;

create table if not exists jpa.item
(
    itemid
    bigint
    not
    null,
    cost
    integer,
    image
    bytea,
    name
    varchar
(
    255
),
    primary key
(
    itemid
)
    );

create table if not exists jpa.users
(
    id
    integer
    not
    null,
    email
    varchar
(
    255
),
    password varchar
(
    255
),
    reserved boolean not null,
    username varchar
(
    255
),
    primary key
(
    id
)
    );

create table if not exists jpa.role
(
    id
    bigint
    not
    null,
    name
    varchar
(
    255
),
    primary key
(
    id
)
    );

create table if not exists jpa.users_roles
(
    user_id
    integer
    not
    null,
    roles_id
    bigint
    not
    null,
    primary
    key
(
    user_id,
    roles_id
),
    constraint fk15d410tj6juko0sq9k4km60xq
    foreign key
(
    roles_id
) references jpa.role,
    constraint fk2o0jvgh89lemvvo17cbqvdxaa
    foreign key
(
    user_id
) references jpa.users
    );

create table if not exists jpa.res
(
    id
    integer
    not
    null,
    number_of_time
    integer
    not
    null,
    primary
    key
(
    id
)
    );

create table if not exists "jpa.order"
(
    order_id
    bigint
    not
    null,
    comment
    varchar
(
    255
),
    done integer,
    time timestamp,
    user_id integer,
    primary key
(
    order_id
),
    constraint fkh3c37jq3nrv0f2edcxk0ine72
    foreign key
(
    user_id
) references jpa.users
    );

create table if not exists jpa.order_items
(
    count
    integer
    not
    null,
    order_id
    bigint
    not
    null,
    item_id
    bigint
    not
    null,
    primary
    key
(
    order_id,
    item_id
),
    constraint fkjg8ob3r0ws22krbj2xu30nhi1
    foreign key
(
    order_id
) references "jpa.order",
    constraint fkpttit550s4ekrghi11o2q6dqx
    foreign key
(
    item_id
) references jpa.item
    );

insert into jpa.users (id, email, password, reserved, username)
values ((select nextval('jpa.hibernate_sequence')),'ADMIN@ivan.ru', '$2a$10$Kqtzz2SHtAST9WwU6Urcu.1Z7xwirPoSPJ2qArMgyP5dMJyFIB4jC', false, 'IvanAdmin');
insert into jpa.role (id, name)
values ((select nextval('jpa.hibernate_sequence')),'USER'),
       ((select nextval('jpa.hibernate_sequence')),'ADMIN');
insert into jpa.users_roles (user_id, roles_id)
values ((select id from jpa.users where email= 'ADMIN@ivan.ru'), (select id from jpa.role where name = 'ADMIN'));
insert into "jpa.order" (order_id, comment, done, "time", user_id)
values ((select nextval('jpa.hibernate_sequence')),null, 0, null, (select id from jpa.users where email= 'ADMIN@ivan.ru'));

