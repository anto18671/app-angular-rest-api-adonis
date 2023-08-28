-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: demo
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'1692983836179_user',1,'2023-08-25 17:28:14'),(2,'1692983836182_token',1,'2023-08-25 17:28:14'),(5,'1693000768883_equipment_schema',2,'2023-08-27 19:04:41');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `equipment` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (25,'1111222','Franke','Oil heater','2023-08-28 10:29:05','2023-08-28 10:42:56'),(26,'233f2628-bf53-46d6-a7ea-a06860b31aaf','Fagor','Attic fan','2023-08-28 10:29:07','2023-08-28 10:29:07'),(27,'f7887328-27c0-4bc6-8083-208413e8f73b','Electrolux','Washing machine','2023-08-28 10:29:09','2023-08-28 10:29:09'),(28,'d2191ca1-b7f8-4187-b49a-3e70430d438c','Blue Star','Drawer dishwasher','2023-08-28 10:29:10','2023-08-28 10:29:10'),(29,'b98796d9-6ad9-4158-b0e2-81133dea805e','Franke','Back boiler','2023-08-28 10:29:13','2023-08-28 10:29:13'),(30,'e3719946-6b3c-4950-9504-ec71ad1ac94a','Siemens','Central vacuum cleaner','2023-08-28 10:29:15','2023-08-28 10:29:15'),(31,'a5bf1f81-a167-4443-9019-802423f1fe16','Franke','Fan heater','2023-08-28 10:29:17','2023-08-28 10:29:17'),(32,'68963bdc-f1c9-40f9-a5bb-b810a155e624','KitchenAid','Stove','2023-08-28 10:29:19','2023-08-28 10:29:19'),(33,'dcf298e9-530c-4d4c-977e-d604d87769d2','Franke','Clothes iron','2023-08-28 10:29:21','2023-08-28 10:29:21'),(34,'a9e6f4b0-0306-4508-91e8-126ba1572630','Fagor','Kimchi refrigerator','2023-08-28 10:29:23','2023-08-28 10:29:23'),(35,'f6ae912c-2bd0-4531-bc0d-6d9c07f00aca','Franke','Patio heater','2023-08-28 10:29:25','2023-08-28 10:29:25'),(36,'d1c88859-177e-4304-88a6-0b5f545bef95','Amana','Appliance plug','2023-08-28 10:33:01','2023-08-28 10:33:01'),(37,'6fc3b504-1c1a-4a90-be63-fb6f719941d7','Amana','Kimchi refrigerator','2023-08-28 10:33:05','2023-08-28 10:33:05'),(38,'sac','asc','sac','2023-08-28 10:41:55','2023-08-28 10:41:55'),(39,'asccssa','sac','sasca','2023-08-28 10:42:51','2023-08-28 10:42:51');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unique` (`token`),
  KEY `tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@test.com','$2a$10$gqmv0Sg2TFwS6I.ayE135OtKWAe7ENvwidpXbGnDl/h0Ku6N0zMMe','2023-08-25 15:06:34','2023-08-25 15:06:34'),(2,'test2@test.com','$2a$10$Wg7/lxjjOFRqQP1uVw/hCe2lFpOyslk28H4F3gKN7ooF.GO1obkXe','2023-08-25 15:14:01','2023-08-25 15:14:01'),(3,'allo@allo.com','$2a$10$U4rTZZ4hgiXrMAfwvWSxueSto4aGL7nMH9lR/oCxaBOqHteFugFO.','2023-08-25 15:15:24','2023-08-25 15:15:24'),(4,'alloallo@allo.com','$2a$10$ez7W6K6J6NPWlvNXTTICvee44qTTJkpggOyWHKvUfZ7ZFkWaW/Dk2','2023-08-25 15:38:46','2023-08-25 15:38:46'),(5,'test1234@test.com','$2a$10$QQio9wqu5j9l809PM3QpVuq3WlNvwnsrqg.9UejE6Qlh3UQhbnNdW','2023-08-25 18:42:12','2023-08-25 18:42:12'),(6,'qwef@sacadscaed.com','$2a$10$/UxyOcShobilhMWAsU/ureMbo8U9DKeEjCfl9BBLbx.NMLGyWAQXG','2023-08-28 08:39:26','2023-08-28 08:39:26'),(7,'testaSDA@BJUAEDCF.test','$2a$10$EerK0XAE1VhCaGOkSU/vYOyY/W0FQB6fQro9ycP0fiaoNFn0GNpfy','2023-08-28 08:39:44','2023-08-28 08:39:44'),(8,'asdffce@oubj.com','$2a$10$C804QFDuFE57ENh.XGRjpukovQZIaeBrtfefYcSHtNnwZDcFQiOFm','2023-08-28 08:56:40','2023-08-28 08:56:40'),(9,'finaltest@test.test','$2a$10$MjG3zKaWvhoivFr9aDwcdeb15R4ZXwzV4Hap.4sjKwMTyxq8gvd.S','2023-08-28 10:41:12','2023-08-28 10:41:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-28 10:58:36
