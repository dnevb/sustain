create type ticket_status as enum(
  'pending',
  'in_progress',
  'canceled',
  'completed'
);
create table "ticket" (
  -- defaults
  id varchar(8) primary key,
  created timestamp default CURRENT_TIMESTAMP not null,
  updated timestamp default CURRENT_TIMESTAMP not null,
  deleted timestamp,
  -- core
  status ticket_status default 'pending' not null,
  priority int not null,
  summary varchar(80) not null,
  description text,
  assigned_to varchar(8) not null,
  requested_by varchar(8) not null,
  -- constraints
  constraint "assigned" foreign key (assigned_to) references "user" (id),
  constraint "requested" foreign key (requested_by) references "user" (id)
);
create table "ticket_comment" (
  -- defaults
  id varchar(8) primary key,
  created timestamp default CURRENT_TIMESTAMP not null,
  updated timestamp default CURRENT_TIMESTAMP not null,
  deleted timestamp,
  -- core
  content text not null,
  user_id varchar(8) not null,
  ticket_id varchar(8) not null,
  -- constraints
  constraint "user" foreign key (user_id) references "user" (id),
  constraint "ticket" foreign key (ticket_id) references "ticket" (id)
)