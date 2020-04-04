--
-- Current Database: `applifting`
--

CREATE DATABASE IF NOT EXISTS `applifting` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `applifting`;
--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
                                           `email` text NOT NULL,
                                           `user_name` varchar(50) NOT NULL,
                                           `access_token` varchar(36) NOT NULL,
                                           `id` varchar(36) NOT NULL,
                                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `monitored_endpoints`
--

CREATE TABLE IF NOT EXISTS `monitored_endpoints` (
                                       `name` varchar(50) NOT NULL,
                                       `url` text NOT NULL,
                                       `created` datetime(3) NOT NULL,
                                       `last_checked` datetime(3),
                                       `monitored_interval` int(11) NOT NULL,
                                       `id` int(11) NOT NULL AUTO_INCREMENT,
                                       `user_id` varchar(36) NOT NULL,
                                       PRIMARY KEY (`id`),
                                       KEY `monitored_endpoint_user_id_fk` (`user_id`),
                                       CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Table structure for table `monitoring_results`
--

CREATE TABLE IF NOT EXISTS `monitoring_results` (
                                                     `checked` datetime(3) NOT NULL,
                                                     `status_code` int(11) NOT NULL,
                                                     `payload` text NOT NULL,
                                                     `id` int(11) NOT NULL AUTO_INCREMENT,
                                                     `endpoint_id` int(11) NOT NULL,
                                                     PRIMARY KEY (`id`),
                                                     KEY `monitoring_result_endpoint_id_fk` (`endpoint_id`),
                                                     CONSTRAINT `endpoint_id_fk` FOREIGN KEY (`endpoint_id`) REFERENCES `monitored_endpoints` (`id`) ON DELETE Cascade ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Insert dummy users
--

INSERT INTO `users` (email, user_name, access_token, id) VALUES ('info@applifting.cz','Applifting','93f39e2f-80de-4033-99ee-249d92736a25', '3035f7ab-94e6-4ec3-877c-1ab19d898c8f'),('batman@example.com','Batman','dcb20f8a-5657-4f1b-9f7f-ce65739b359e','af51e84e-409b-4271-a0c7-89077ef09e77');
