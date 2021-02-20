
DROP DATABASE IF EXISTS `menu_demo`;
CREATE DATABASE `menu_demo`;
USE `menu_demo`;

############################################## 
#THIS IS ADMIN SECTION 
##############################################
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) UNIQUE NOT NULL,
    `password` VARCHAR(50),
    `suspended` TINYINT NULL DEFAULT 0,
	`privileges` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`user_id`)
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;
INSERT INTO `users` (name, password, privileges,createdAt,updatedAt) VALUES ('ahmed','1234','admin', '2020-11-24 10:04:08','2020-11-24 10:04:08');

############################################## 
#THIS IS ITEMS SECTION, CATEGORY & ITEM 
##############################################
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `category_id` INT NOT NULL AUTO_INCREMENT,
    `title_en`  VARCHAR(50) NOT NULL,
	`title_ar`  VARCHAR(50) ,
    `title_ku`  VARCHAR(50) ,
	PRIMARY KEY (`category_id`)
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;
INSERT INTO `categories` VALUES (0,'Hello','مرحبا','سڵاو');

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
    `item_id` INT NOT NULL AUTO_INCREMENT,
	`category_id` INT NOT NULL,
    `user_id` INT NOT NULL,
	`state` VARCHAR(50) NOT NULL,    
    `sizes` VARCHAR(50),
	`prices` VARCHAR(100),
	`cals` VARCHAR(100),
    `tags` VARCHAR(100),
    `time` SMALLINT,
    `title_en` VARCHAR(100) NOT NULL,
    `title_ar` VARCHAR(100) ,
    `title_ku` VARCHAR(100) ,
    `desc_en` TEXT,
    `desc_ar` TEXT,
    `desc_ku` TEXT,
    `createdAt` DATETIME,
	`updatedAt` DATETIME,
    PRIMARY KEY (`item_id`),
	KEY `fk_items_categories_idx` (`category_id`),
    KEY `fk_items_users_idx` (`user_id`),
    CONSTRAINT `fk_items_categories` FOREIGN KEY (`category_id`)
        REFERENCES `categories` (`category_id`)
        ON UPDATE CASCADE,
	CONSTRAINT `fk_items_users` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`)
        ON UPDATE CASCADE
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;

############################################## 
#THIS IS GENERAL SECTION, TABLE, ORDER, ORDER ITEM 
##############################################
DROP TABLE IF EXISTS `tables`;
CREATE TABLE `tables` (
    `table_id` INT NOT NULL AUTO_INCREMENT,
    `number`  INT NOT NULL,
	`state`  VARCHAR(50) ,
	PRIMARY KEY (`table_id`)
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;

CREATE TABLE `customers` (
    `customer_id` VARCHAR(15),
    `name` VARCHAR(50) NOT NULL,
    `table_id` INT NOT NULL,
	PRIMARY KEY (`customer_id`),
	KEY `fk_customers_tables_idx` (`table_id`),
    CONSTRAINT `fk_customers_tables` FOREIGN KEY (`table_id`)
        REFERENCES `tables` (`table_id`)
        ON UPDATE CASCADE
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;

DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests` (
    `request_id` VARCHAR(15),
    `table_id` INT NOT NULL,
    `name`  VARCHAR(50),
    `state` VARCHAR(10),
    `createdAt` DATETIME NOT NULL,
	PRIMARY KEY (`request_id`)
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;

DROP TABLE IF EXISTS `table_items`;
CREATE TABLE `table_items` (
    `table_id` INT NOT NULL ,
    `customer_id` VARCHAR(15) NOT NULL ,
    `item_id` INT NOT NULL,
    `size` INT NOT NULL,
    `price` INT NOT NULL,
    `quantity` INT NOT NULL,
    `state`  VARCHAR(50),
    `total` INT NOT NULL,
    `createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`customer_id`,`item_id` , `size`),
    KEY `fk_table_items_table_idx` (`table_id`),
    CONSTRAINT `fk_table_items_tables` FOREIGN KEY (`table_id`)
        REFERENCES `tables` (`table_id`)
        ON UPDATE CASCADE,
	CONSTRAINT `fk_table_items_customers` FOREIGN KEY (`customer_id`)
        REFERENCES `customers` (`customer_id`)
        ON UPDATE CASCADE,
    CONSTRAINT `fk_table_items_items` FOREIGN KEY (`item_id`)
        REFERENCES `items` (`item_id`)
        ON UPDATE CASCADE
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `order_id` INT NOT NULL AUTO_INCREMENT,
    `table_id` INT NOT NULL,
    `user_id` INT DEFAULT NULL,
    `order_date` DATE NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `comments` TEXT DEFAULT NULL,
	`service_fee` INT DEFAULT NULL,
    `received` INT NOT NULL,
    `total` INT NOT NULL,
    `createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`order_id`),
    KEY `fk_orders_users_idx` (`user_id`),
    KEY `fk_orders_tables_idx` (`table_id`),
    CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`)
        ON UPDATE CASCADE,
    CONSTRAINT `fk_orders_tables` FOREIGN KEY (`table_id`)
        REFERENCES `tables` (`table_id`)
        ON UPDATE CASCADE
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;

############################################## 
#THIS IS GENERAL SECTION, TABLE, ORDER, ORDER ITEM 
##############################################

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
    `order_id` INT NOT NULL ,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `unit_price` INT NOT NULL,
    `createdAt` DATE NOT NULL,
    PRIMARY KEY (`order_id` , `product_id`),
    KEY `fk_order_items_products_idx` (`product_id`),
    CONSTRAINT `fk_order_items_orders` FOREIGN KEY (`order_id`)
        REFERENCES `orders` (`order_id`)
        ON UPDATE CASCADE,
    CONSTRAINT `fk_order_items_products` FOREIGN KEY (`product_id`)
        REFERENCES `products` (`product_id`)
        ON UPDATE CASCADE
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8MB4 COLLATE = utf8mb4_general_ci;







