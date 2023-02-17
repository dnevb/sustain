create type "user_role" as enum('client', 'technician');
create table "user" (
  -- defaults
  id varchar(8) primary key,
  created timestamp default CURRENT_TIMESTAMP not null,
  updated timestamp default CURRENT_TIMESTAMP not null,
  deleted timestamp,
  -- core
  role user_role default 'client' not null,
  first_name varchar(60) not null,
  last_name varchar(60) not null,
  display_name text,
  email varchar(80) unique not null,
  password text not null
);