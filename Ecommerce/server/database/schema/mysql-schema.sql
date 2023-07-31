/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `prix` float NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stocks_id` int NOT NULL,
  `note_totale` int DEFAULT '0',
  PRIMARY KEY (`id`,`stocks_id`),
  KEY `fk_articles_stocks1_idx` (`stocks_id`),
  CONSTRAINT `fk_articles_stocks1` FOREIGN KEY (`stocks_id`) REFERENCES `stocks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `articles_caracteristiques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles_caracteristiques` (
  `id_articles` int NOT NULL,
  `id_caracteristiques` int NOT NULL,
  KEY `fk_articles_articles_caracteristiques` (`id_articles`),
  KEY `fk_caracteristiques_articles_caracteristiques` (`id_caracteristiques`),
  CONSTRAINT `fk_articles_articles_caracteristiques` FOREIGN KEY (`id_articles`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_caracteristiques_articles_caracteristiques` FOREIGN KEY (`id_caracteristiques`) REFERENCES `caracteristiques` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `articles_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles_categories` (
  `id_articles` int NOT NULL,
  `id_categories` int NOT NULL,
  KEY `fk_articles_articles_categories` (`id_articles`),
  KEY `fk_categories_articles_categories` (`id_categories`),
  CONSTRAINT `fk_articles_articles_categories` FOREIGN KEY (`id_articles`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_categories_articles_categories` FOREIGN KEY (`id_categories`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `avis_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avis_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `users_id` int NOT NULL,
  `articles_id` int NOT NULL,
  `articles_caracteristiques_id` int NOT NULL,
  `articles_stocks_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`,`articles_id`,`articles_caracteristiques_id`,`articles_stocks_id`),
  KEY `fk_avis_notes_users1_idx` (`users_id`),
  KEY `fk_avis_notes_articles1_idx` (`articles_id`,`articles_caracteristiques_id`,`articles_stocks_id`),
  KEY `fk_avis_notes_articles1` (`articles_id`,`articles_stocks_id`),
  CONSTRAINT `fk_avis_notes_articles1` FOREIGN KEY (`articles_id`, `articles_stocks_id`) REFERENCES `articles` (`id`, `stocks_id`),
  CONSTRAINT `fk_avis_notes_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `caracteristiques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caracteristiques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caracteristique` varchar(45) DEFAULT NULL,
  `valeur` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sous_categorie_name` varchar(155) NOT NULL,
  `categorie_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`categorie_name`),
  KEY `fk_sous_categories_categories1_idx` (`categorie_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `commandes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adresse` varchar(255) NOT NULL,
  `codePostal` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `paiement` varchar(45) NOT NULL,
  `paiementIsVerified` tinyint NOT NULL DEFAULT '0',
  `prix_total_ttc` float NOT NULL,
  `livraison_id` int NOT NULL,
  `paniers_id` int NOT NULL,
  `paniers_users_id` int NOT NULL,
  PRIMARY KEY (`id`,`livraison_id`,`paniers_id`,`paniers_users_id`),
  KEY `fk_commandes_livraison1_idx` (`livraison_id`),
  KEY `fk_commandes_paniers1_idx` (`paniers_id`,`paniers_users_id`),
  CONSTRAINT `fk_commandes_livraison1` FOREIGN KEY (`livraison_id`) REFERENCES `livraison` (`id`),
  CONSTRAINT `fk_commandes_paniers1` FOREIGN KEY (`paniers_id`, `paniers_users_id`) REFERENCES `paniers` (`id`, `users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoris` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `articles_id` int NOT NULL,
  `articles_caracteristiques_id` int NOT NULL,
  `articles_stocks_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`,`articles_id`,`articles_caracteristiques_id`,`articles_stocks_id`),
  KEY `fk_favoris_users1_idx` (`users_id`),
  KEY `fk_favoris_articles1_idx` (`articles_id`,`articles_caracteristiques_id`,`articles_stocks_id`),
  KEY `fk_favoris_articles1` (`articles_id`,`articles_stocks_id`),
  CONSTRAINT `fk_favoris_articles1` FOREIGN KEY (`articles_id`, `articles_stocks_id`) REFERENCES `articles` (`id`, `stocks_id`),
  CONSTRAINT `fk_favoris_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `livraison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livraison` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mode_de_livraison` varchar(255) NOT NULL,
  `frais_de_livraison` float NOT NULL,
  `is_delivered` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cvv` int DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `commandes_id` int NOT NULL,
  `commandes_livraison_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`,`commandes_id`,`commandes_livraison_id`,`users_id`),
  KEY `fk_paiement_commandes1_idx` (`commandes_id`,`commandes_livraison_id`),
  KEY `fk_paiement_users1_idx` (`users_id`),
  CONSTRAINT `fk_paiement_commandes1` FOREIGN KEY (`commandes_id`, `commandes_livraison_id`) REFERENCES `commandes` (`id`, `livraison_id`),
  CONSTRAINT `fk_paiement_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `panier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `panier` (
  `id` int NOT NULL,
  `is_verified` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `paniers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paniers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `is_validated` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_panier_users1_idx` (`users_id`),
  CONSTRAINT `fk_panier_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `paniers_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paniers_articles` (
  `id_panier` int NOT NULL,
  `id_articles` int NOT NULL,
  KEY `fk_articles_paniers_articles` (`id_articles`),
  KEY `fk_paniers_paniers_articles` (`id_panier`),
  CONSTRAINT `fk_articles_paniers_articles` FOREIGN KEY (`id_articles`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_paniers_paniers_articles` FOREIGN KEY (`id_panier`) REFERENCES `paniers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantite` int NOT NULL DEFAULT '0',
  `adresse` varchar(45) NOT NULL,
  `frais_port` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `admin` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `email_verified_at` varchar(45) DEFAULT NULL,
  `pseudo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_reset_tokens_table',1);
INSERT INTO `migrations` VALUES (2,'2019_08_19_000000_create_failed_jobs_table',1);
INSERT INTO `migrations` VALUES (3,'2019_12_14_000001_create_personal_access_tokens_table',1);
INSERT INTO `migrations` VALUES (4,'2023_07_28_082022_create_user_table',2);
