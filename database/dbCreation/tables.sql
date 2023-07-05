CREATE DATABASE upfcapp;

CREATE TABLE `user_category` (
  `id` INTEGER NOT NULL auto_increment,
  `user_category` TEXT NOT NULL,
  PRIMARY KEY (id)
)
INSERT INTO
  `user_category`
VALUES
  (1, 'validator'),
  (2, 'enterprise'),
  (3, 'unplastify') CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL auto_increment,
    `name` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `user_category_id` INTEGER NOT NULL,
    `registered` INTEGER DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_category_id) REFERENCES user_category(id)
  ) CREATE TABLE enterprise_details (
    `user_id` INTEGER NOT NULL,
    `cuit` bigint,
    `country` TEXT,
    `city` TEXT,
    `employees` INTEGER,
    `invoicing` DECIMAL(25, 10),
    `mipyme` TEXT,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
  ) CREATE TABLE treace_type(
    id_treace_type INTEGER NOT NULL auto_increment,
    treace_type TEXT NOT NULL,
    PRIMARY KEY (id_treace_type)
  )
INSERT INTO
  treace_type (treace_type)
VALUES
  ('Primary'),
  ('Secondary') CREATE TABLE product_category(
    id_product_category INTEGER NOT NULL auto_increment,
    category TEXT NOT NULL,
    PRIMARY KEY (id_product_category)
  )
INSERT INTO
  product_category (category)
VALUES
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
  ('Health') CREATE TABLE desplastified_activity(
    id_desplastified_activity INTEGER NOT NULL auto_increment,
    activity TEXT,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id_desplastified_activity)
  )
INSERT INTO
  desplastified_activity (activity)
VALUES
  ('Product Manufacturing'),
  ('Gastronomic Service'),
  ('Logistics and Retail Service'),
  ('Maintenance Service'),
  ('Hosting Service'),
  ('Others') CREATE TABLE product_measurement_unit(
    id_product_measurement_unit INTEGER NOT NULL auto_increment,
    measurement_unit TEXT NOT NULL,
    PRIMARY KEY (id_product_measurement_unit)
  )
INSERT INTO
  product_measurement_unit (measurement_unit)
VALUES
  ('Units'),
  ('KG'),
  ('L') CREATE TABLE plastic_item(
    id_plastic_item INTEGER NOT NULL auto_increment,
    plastic_item TEXT NOT NULL,
    PRIMARY KEY (id_plastic_item)
  )
INSERT INTO
  plastic_item (plastic_item)
VALUES
  ('Disposable Plastic Packaging'),
  ('Disposable Plastic Bottle/Bidon'),
  ('Disposable Plastic Bag'),
  ('Disposable Plastic Pot'),
  ('Disposable Plastic Films and Rolls'),
  ('Disposable Plastic Cups'),
  ('Disposable Plastic Tableware and Utensils'),
  ('Disposable Plastic Trays and Containers'),
  ('Tetra Pack'),
  ('Disposable Plastic Seals and Cards') CREATE TABLE source_change(
    id_source_change INTEGER NOT NULL auto_increment,
    source_change TEXT NOT NULL,
    PRIMARY KEY (id_source_change)
  )
INSERT INTO
  source_change (source_change)
VALUES
  ('Efficiency/Reduction'),
  ('Bulk'),
  ('ReFill'),
  ('reusable'),
  ('Alternative material') CREATE TABLE alternative_plastic_item(
    id_alternative_plastic_item INTEGER NOT NULL auto_increment,
    alternative_plastic_item TEXT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id_alternative_plastic_item)
  )
INSERT INTO
  alternative_plastic_item (alternative_plastic_item)
VALUES
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
  ('Digital') CREATE TABLE impact_approach (
    `id_impact_approach` INTEGER NOT NULL auto_increment,
    `impact_approach` TEXT,
    PRIMARY KEY (id_impact_approach)
  )
INSERT INTO
  impact_approach (impact_approach)
VALUES
  ('Purchases'),
  ('Sales') CREATE TABLE minting_request_status (
    `id_status` INTEGER NOT NULL auto_increment,
    `status` TEXT NOT NULL,
    PRIMARY KEY (id_status)
  );

INSERT INTO
  minting_request_status (`status`)
VALUES
  ('Created'),
  ('Submited'),
  ('In Review'),
  ('Further documentation requested'),
  ('Approved'),
  ('Rejected'),
  ('Stand-by'),
  ('Assigned');

CREATE TABLE minting_request(
  `minting_request_id` INTEGER NOT NULL auto_increment,
  `user_id` INTEGER NOT NULL,
  `name` TEXT,
  `status_id` INTEGER NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedAt` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`minting_request_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (`status_id`) REFERENCES minting_request_status(`id_status`)
);

CREATE TABLE unplastified_item (
  `unplastified_item_id` INTEGER NOT NULL auto_increment,
  `minting_request_id` INTEGER NOT NULL,
  `before_pic` TEXT,
  `after_pic` TEXT,
  `video` TEXT,
  `technical_file` TEXT,
  `additional_documents` TEXT,
  `sku` TEXT,
  `plastic_item` TEXT,
  `implemented_change` TEXT,
  `implementation_date` date,
  `id_plastic_item_before` INTEGER,
  `id_alternative_plastic_item` INTEGER,
  `id_impact_approach` INTEGER,
  `id_product_measurement_unit` INTEGER,
  `impact_approach_quantity` DECIMAL(30, 18),
  `dir_name` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`unplastified_item_id`),
  FOREIGN KEY (`minting_request_id`) REFERENCES minting_request(`minting_request_id`),
  FOREIGN KEY (id_product_measurement_unit) REFERENCES product_measurement_unit(id_product_measurement_unit),
  FOREIGN KEY (id_impact_approach) REFERENCES impact_approach(id_impact_approach),
  FOREIGN KEY (id_plastic_item_before) REFERENCES plastic_item(id_plastic_item),
  FOREIGN KEY (id_alternative_plastic_item) REFERENCES alternative_plastic_item(id_alternative_plastic_item)
);

CREATE TABLE chat_room(
  `chat_id` INTEGER NOT NULL auto_increment,
  `minting_request_id` INTEGER NOT NULL,
  `user_category_id` INTEGER NOT NULL,
  `msg` TEXT NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedAt` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`chat_id`),
  FOREIGN KEY (`minting_request_id`) REFERENCES minting_request(`minting_request_id`),
  FOREIGN KEY (`user_category_id`) REFERENCES user_category (`id`)
);

CREATE TABLE validation_status(
  `validation_status_id` INTEGER NOT NULL auto_increment,
  `status` TEXT NOT NULL,
  PRIMARY KEY (`validation_status_id`)
);

INSERT INTO
  `validation_status` (`status`)
VALUES
  ('Assigned'),
  ('Completed'),
  ('Rejected'),
  ('Canceled');

CREATE TABLE validation_tracking (
  `minting_request_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  `validation_status_id` INTEGER NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedAt` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`minting_request_id`, `user_id`),
  FOREIGN KEY (`minting_request_id`) REFERENCES minting_request(`minting_request_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (`validation_status_id`) REFERENCES validation_status (`validation_status_id`)
);