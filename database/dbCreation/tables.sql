create database upfcapp;

create table `user_category` (
  `id` integer not null auto_increment,
  `user_category` text not null,
  primary key (id)
)

insert into `user_category` 
values
(1, 'validator'),
(2, 'enterprise'),
(3, 'unplastify')

create table `user` (
  `user_id` integer not null auto_increment,
  `name` text not null,
  `email` text not null,
  `address` text not null,
  `password` text not null,
  `user_category_id` integer not null,
  `registered` integer DEFAULT 0,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (user_id),
  foreign key (user_category_id) REFERENCES user_category(id)
)

create table enterprise_details (
  `id` integer not null,
  `cuit` bigint,
  `country` text,
  `city` text,
  `employees` integer,
  `invoicing` decimal(25,10),
  `mipyme` text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (id),
  foreign key (id) REFERENCES user(user_id)
)

create table treace_type(
  id_treace_type integer not null auto_increment,
  treace_type text,
  primary key (id_treace_type)
)

insert into treace_type (treace_type)
values
('Primary'),
('Secondary')

create table product_category(
  id_product_category integer not null auto_increment,
  category text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (id_product_category)
)

insert into product_category (category)
values
('Foods'),
('Beverages'),
('Hygiene and personal care'),
('Perfumery'),
('Cleaning'),
('Crockery'),
('Bazaar Home and Deco'),
('Bookshop'),
('Electronics'),
('Clothing and Footwear'),
('Textile'),
('Automotive'),
('Sports'),
('Building'),
('Entertainment'),
("Jeweler's"),
('Toy store'),
('Films and Rolls'),
('Bags'),
('Marketing'),
('Health')

create table desplastified_activity(
  id_desplastified_activity integer  not null auto_increment,
  activity text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (id_desplastified_activity)
)

insert into desplastified_activity (activity)
values
('Product Manufacturing'),
('Gastronomic Service'),
('Logistics and Retail Service'),
('Maintenance Service'),
('Hosting Service'),
('Others')

create table product_measurement_unit(
  id_product_measurement_unit integer not null auto_increment,
  measurement_unit text,
  primary key (id_product_measurement_unit)
)

insert into product_measurement_unit (measurement_unit)
values
('Units'),
('KG'),
('L')

create table plastic_item(
  id_plastic_item integer not null auto_increment,
  plastic_item text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (id_plastic_item)
)

insert into plastic_item (plastic_item)
values
('Disposable Plastic Packaging'),
('Disposable Plastic Bottle/Bidon'),
('Disposable Plastic Bag'),
('Disposable Plastic Pot'),
('Disposable Plastic Films and Rolls'),
('Disposable Plastic Cups'),
('Disposable Plastic Tableware and Utensils'),
('Disposable Plastic Trays and Containers'),
('Tetra Pack'),
('Disposable Plastic Seals and Cards')

create table source_change(
  id_source_change integer not null auto_increment,
  source_change text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (id_source_change)
)

insert into source_change (source_change)
values
('Efficiency/Reduction'),
('Bulk'),
('ReFill'),
('reusable'),
('Alternative material')

create table alternative_plastic_item(
  id_alternative_plastic_item integer not null auto_increment,
  alternative_plastic_item text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (id_alternative_plastic_item)
)

insert into alternative_plastic_item (alternative_plastic_item)
values
('Disposable Paper'),
('Disposable Cardboard'),
('Glass'),
('Metal'),
('Stainless steel'),
('Aluminum'),
('Tetra Pack'),
('Cloth'),
('Other reusable'),
('Disposable Plastic'),
('Reusable Plastic'),
('Digital')

create table impact_approach (
  `id_impact_approach` integer not null auto_increment,
  `impact_approach` text,
  primary key (id_impact_approach)
)
insert into impact_approach (impact_approach)
values
('Purchases'),
('Sales')

create table minting_request_status (
  `id_status` integer not null auto_increment,
  `status` text,
  primary key (id_status)
)
insert into minting_request_status (`status`)
values
('Submited'),
('In Review'),
('Further documentation requested'),
('Approved'),
('Rejected'),
('Stand-by')

create table minting_request (
  `minting_request_id` integer not null auto_increment,
  `user_id` integer not null,
  `before_pic` text,
  `after_pic` text,
  `video` text,
  `technical_file` text,
  `additional_pics` text,
  `sku` text,
  `plastic_item` text,
  `implemented_change` text,
  `implementation_date` date,
  `id_plastic_item_before` integer,
  `id_alternative_plastic_item` integer,
  `id_impact_approach` integer,
  `id_product_measurement_unit` integer,
  `impact_approach_quantity` decimal(30,18),
  `id_minting_request_status` integer,
  `dir_name` text,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (`minting_request_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (id_minting_request_status) REFERENCES minting_request_status(id_status),
  FOREIGN KEY (id_product_measurement_unit) REFERENCES product_measurement_unit(id_product_measurement_unit),
  FOREIGN KEY (id_impact_approach) REFERENCES impact_approach(id_impact_approach),
  FOREIGN KEY (id_plastic_item_before) REFERENCES plastic_item(id_plastic_item),
  FOREIGN KEY (id_alternative_plastic_item) REFERENCES alternative_plastic_item(id_alternative_plastic_item)
)
create table minting_request_old (
  `minting_request_id` integer not null auto_increment,
  `user_id` integer not null,
  `before_pic` text,
  `after_pic` text,
  `video` text,
  `technical_file` text,
  `additional_pics` text,
  `proof_of_purchase` text,
  `dispatch_note` text,
  `sku` text,
  `id_treace_type` integer,
  `plastic_item` text,
  `graduality_category` text,
  `id_product_category` integer,
  `id_desplastified_activity` integer,
  `id_product_measurement_unit` integer,
  `id_plastic_item_before` integer,
  `previous_plastic_weight` decimal(30,18),
  `previous_cuantity` decimal(30,18),
  `id_source_change` integer,
  `implementation_date` date,
  `id_alternative_plastic_item` integer,
  `actual_plastic_weight` decimal(30,18),
  `actual_cuantity` decimal(30,18),
  `plastic_ratio` decimal(30,18),
  `id_impact_approach` integer,
  `impact_approach_quantity` decimal(30,18),
  `id_impact_approach_measurement_unit` integer,
  `impact_approach_files` text,
  `id_minting_request_status` integer,
  `createdAt` timestamp default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  primary key (`minting_request_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (`id_treace_type`) REFERENCES treace_type(id_treace_type),
  FOREIGN KEY (id_product_category) REFERENCES product_category(id_product_category),
  FOREIGN KEY (id_minting_request_status) REFERENCES minting_request_status(id_status),
  FOREIGN KEY (id_desplastified_activity) REFERENCES desplastified_activity(id_desplastified_activity),
  FOREIGN KEY (id_product_measurement_unit) REFERENCES product_measurement_unit(id_product_measurement_unit),
  FOREIGN KEY (id_impact_approach) REFERENCES impact_approach(id_impact_approach),
  FOREIGN KEY (id_impact_approach_measurement_unit) REFERENCES product_measurement_unit(id_product_measurement_unit),
  FOREIGN KEY (id_plastic_item_before) REFERENCES plastic_item(id_plastic_item),
  FOREIGN KEY (id_source_change) REFERENCES source_change(id_source_change),
  FOREIGN KEY (id_alternative_plastic_item) REFERENCES alternative_plastic_item(id_alternative_plastic_item)
)
