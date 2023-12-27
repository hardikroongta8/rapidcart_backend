create table users(
	id varchar(40) check(id ~ '^\d+$') primary key,
	firstname varchar(50) not null,
	lastname varchar(50),
	email varchar(100) not null,
	addresses varchar(500)[] not null default array[]::varchar(500)[]
);

create table products(
	id bigserial primary key,
	product_name varchar(255) not null,
	price int not null,
	quantity int not null,
	images varchar(500)[] not null default array[]::varchar(500)[],
	description text,
	seller_id varchar(40) references users(id) not null
);

create table wishlists(
	id bigserial primary key,
	product_id bigint references products(id) not null,
	user_id varchar(40) references users(id) not null
);

create table carts(
	id bigserial primary key,
	product_id bigint references products(id) not null,
	user_id varchar(40) references users(id) not null
);

create table orders(
	id bigserial primary key,
	product_id bigint references products(id) not null,
	user_id varchar(40) references users(id) not null,
	address varchar(500) not null,
	price int not null,
	delivery_status boolean not null default false
);

create table reviews(
	id bigserial primary key,
	product_id bigint references products(id) not null,
	user_id varchar(40) references users(id) not null,
	rating int check (rating <= 5 and rating >= 1) not null,
	content text,
	images varchar(500)[] not null default array[]::varchar(500)[]
);