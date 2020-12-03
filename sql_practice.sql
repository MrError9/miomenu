SELECT * FROM mio_resturant.categories;
INSERT INTO `mio_resturant`.`categories` (`category_id`, `title_en`, `title_ar`, `title_ku`) VALUES ('12', 'drinks', 'مشروبات', 'خواردنەوەکان');
INSERT INTO `mio_resturant`.`items` (`item_id`, `category_id`, `user_id`, `state`, `time`, `title_en`, `title_ar`, `title_ku`, `desc_en`, `desc_ar`, `desc_ku`, `createdAt`, `updatedAt`) VALUES 
('19', '13', '3', 'available', '5', 'beef', 'فانتا', 'فافا', 'orange beef', 'کۆلا فانتا', 'کۆلای فانتا', '2020-10-21','2020-10-21');
INSERT INTO `mio_resturant`.`sizes` (`item_id`, `size`, `price`, `cal`) VALUES ('19', '0', '25', '600');
