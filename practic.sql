
use practic;


CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `role` (`id`, `code`, `name`) VALUES
(1, 'user', 'Зарегистрированный пользователь'),
(2, 'admin', 'Администратор');

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `status` (`id`, `code`, `name`) VALUES
(1, 'new', 'Новая'),
(2, 'in_progress', 'Идет обучение'),
(3, 'completed', 'Обучение завершено');


CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `payment_method` (`id`, `name`) VALUES
(1, 'Наличными'),
(2, 'Перевод по номеру телефона');



CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL, 
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `user` (`id`, `id_role`, `login`, `password`, `full_name`, `phone`, `email`) VALUES
(1, 2, 'Admin', 'KorokNET', 'Администратор Системы', '8(000)000-00-00', 'admin@example.com');



CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `id_payment_method` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `start_date` date NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;





create table `comment`(
`id` int not null,
`id_user` int (11) not null,
`id_request` int(11) default null,
`text_comment` varchar(255) not null,
`created_at` datetime default current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- ДОБАВЛЕНИЕ ПЕРВИЧНЫХ КЛЮЧЕЙ

ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_login` (`login`),
  ADD UNIQUE KEY `unique_email` (`email`);

ALTER TABLE `request`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);


-- ДОБАВЛЕНИЕ AUTO_INCREMENT

ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
  
  
  -- ДОБАВЛЕНИЕ ИНДЕКСОВ
  
 ALTER TABLE `user`
  ADD INDEX `idx_user_role` (`id_role`);

ALTER TABLE `request`
  ADD INDEX `idx_request_user` (`id_user`),
  ADD INDEX `idx_request_status` (`id_status`),
  ADD INDEX `idx_request_payment` (`id_payment_method`);

ALTER TABLE `comment`
  ADD INDEX `idx_comment_user` (`id_user`),
  ADD INDEX `idx_comment_request` (`id_request`);
  
  
  -- ДОБАВЛЕНИЕ ВНЕШНИХ КЛЮЧЕЙ
  
  ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE;

ALTER TABLE `request`
  ADD CONSTRAINT `fk_request_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_request_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_request_payment` FOREIGN KEY (`id_payment_method`) REFERENCES `payment_method` (`id`) ON DELETE CASCADE;

ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comment_request` FOREIGN KEY (`id_request`) REFERENCES `request` (`id`) ON DELETE SET NULL;


COMMIT;