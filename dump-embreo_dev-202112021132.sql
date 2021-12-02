-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (arm64)
--
-- Host: localhost    Database: embreo_dev
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EventDates`
--

DROP TABLE IF EXISTS `EventDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EventDates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `eventId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `eventdates_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventDates`
--

LOCK TABLES `EventDates` WRITE;
/*!40000 ALTER TABLE `EventDates` DISABLE KEYS */;
INSERT INTO `EventDates` VALUES (1,'2021-12-01 00:00:00',1,'2021-12-02 04:23:51','2021-12-02 04:23:51'),(2,'2021-12-02 00:00:00',1,'2021-12-02 04:23:51','2021-12-02 04:23:51'),(3,'2021-12-03 00:00:00',1,'2021-12-02 04:23:51','2021-12-02 04:23:51'),(4,'2021-12-08 00:00:00',2,'2021-12-02 04:24:22','2021-12-02 04:24:22'),(5,'2021-12-09 00:00:00',2,'2021-12-02 04:24:22','2021-12-02 04:24:22'),(6,'2021-12-10 00:00:00',2,'2021-12-02 04:24:22','2021-12-02 04:24:22'),(7,'2021-12-20 00:00:00',3,'2021-12-02 04:24:54','2021-12-02 04:25:12'),(8,'2021-12-21 00:00:00',3,'2021-12-02 04:24:54','2021-12-02 04:25:12'),(9,'2021-12-22 00:00:00',3,'2021-12-02 04:24:54','2021-12-02 04:25:12'),(10,'2021-11-28 00:00:00',4,'2021-12-02 04:26:20','2021-12-02 04:26:20'),(11,'2021-12-09 00:00:00',4,'2021-12-02 04:26:20','2021-12-02 04:26:20'),(12,'2021-12-30 00:00:00',4,'2021-12-02 04:26:20','2021-12-02 04:26:20'),(13,'2021-12-08 00:00:00',5,'2021-12-02 04:26:57','2021-12-02 04:26:57'),(14,'2021-12-15 00:00:00',5,'2021-12-02 04:26:57','2021-12-02 04:26:57'),(15,'2021-12-30 00:00:00',5,'2021-12-02 04:26:57','2021-12-02 04:26:57'),(16,'2021-12-01 00:00:00',6,'2021-12-02 04:27:35','2021-12-02 04:27:35'),(17,'2021-12-16 00:00:00',6,'2021-12-02 04:27:35','2021-12-02 04:27:35'),(18,'2021-12-30 00:00:00',6,'2021-12-02 04:27:35','2021-12-02 04:27:35'),(19,'2021-12-06 00:00:00',7,'2021-12-02 04:28:08','2021-12-02 04:28:08'),(20,'2021-12-17 00:00:00',7,'2021-12-02 04:28:08','2021-12-02 04:28:08'),(21,'2021-12-24 00:00:00',7,'2021-12-02 04:28:08','2021-12-02 04:28:08');
/*!40000 ALTER TABLE `EventDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `locationText` varchar(255) NOT NULL,
  `locationLat` varchar(255) DEFAULT NULL,
  `locationLang` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Approve','Reject') NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `companyUserId` int NOT NULL,
  `vendorUserId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `confirmedDateId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `companyUserId` (`companyUserId`),
  KEY `vendorUserId` (`vendorUserId`),
  KEY `Events_confirmedDateId_foreign_idx` (`confirmedDateId`),
  CONSTRAINT `Events_confirmedDateId_foreign_idx` FOREIGN KEY (`confirmedDateId`) REFERENCES `EventDates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`companyUserId`) REFERENCES `Users` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`vendorUserId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,'Work Life Balance Talk','Jatinegara',NULL,NULL,'Pending',NULL,1,4,'2021-12-02 04:23:51','2021-12-02 04:23:51',NULL),(2,'Health Talk','Parung',NULL,NULL,'Pending',NULL,1,6,'2021-12-02 04:24:22','2021-12-02 04:24:22',NULL),(3,'Vaccine Talks With Leo','Monas',NULL,NULL,'Pending',NULL,1,7,'2021-12-02 04:24:54','2021-12-02 04:25:12',NULL),(4,'Mental Health Issue','Jatinegara',NULL,NULL,'Pending',NULL,1,4,'2021-12-02 04:26:20','2021-12-02 04:26:20',NULL),(5,'Health With Jimmy','Pulo Gadung',NULL,NULL,'Pending',NULL,1,3,'2021-12-02 04:26:57','2021-12-02 04:26:57',NULL),(6,'7 Minutes workout / day','Senayan',NULL,NULL,'Pending',NULL,1,6,'2021-12-02 04:27:35','2021-12-02 04:27:35',NULL),(7,'Eat Health Life Health','Parung',NULL,NULL,'Pending',NULL,1,4,'2021-12-02 04:28:08','2021-12-02 04:28:08',NULL);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20211127083959-create-user.js'),('20211127084839-create-event.js'),('20211127085335-create-event-date.js'),('20211127085335-update-event.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `institutionName` varchar(255) NOT NULL,
  `role` enum('HR','vendor') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'hr1','$2b$10$f.0vdyk1qgBjYPLZmT28q.Xi.9/6NBfZNBQdw4eNgWstTQ4lq5aa.','hr1@gmail.com','HR Big Group','HR','2021-12-02 04:18:31','2021-12-02 04:18:31'),(2,'hr2','$2b$10$dVLCm15uPYiYlIi1ZP9EpOsYmq3mUAFS6ySEl4brTlsRrFmChxmF2','hr2@gmail.com','HR Speed Group','HR','2021-12-02 04:18:45','2021-12-02 04:18:45'),(3,'vendor1','$2b$10$16w/n.GWO2Sm8NkbPz/D9ehAY1y28cdDDQZu.W4mmzhi7rfsPkT02','vendor1@gmail.com','Vendor Cat Group','vendor','2021-12-02 04:19:12','2021-12-02 04:19:12'),(4,'vendor2','$2b$10$0ZQKDo7JAmHTHJpenDYJVOxwccun5BZeT0HLZFAl28GSZ1o.ShkEK','vendor2@gmail.com','Vendor Bee Group','vendor','2021-12-02 04:19:22','2021-12-02 04:19:22'),(5,'vendor3','$2b$10$QkInazMP9Ctbgry.6i/mMeU0WreqHWjboGWd/g0WvWKa8gcd2ZHOW','vendor3@gmail.com','Vendor Zebra Group','vendor','2021-12-02 04:19:39','2021-12-02 04:19:39'),(6,'vendor4','$2b$10$v6bxbb8JHiqynHoI20gvv.pU3s721/1QRIdUQIEHJH8Jm4brWQxau','vendor4@gmail.com','Vendor Tiger Group','vendor','2021-12-02 04:19:52','2021-12-02 04:19:52'),(7,'vendor5','$2b$10$hww3lR4fiu9j/E8Dx6rrqerxSa6zH1zDJIgpYL8f8pE7f.nZrzOUa','vendor5@gmail.com','Vendor Worm Group','vendor','2021-12-02 04:20:17','2021-12-02 04:20:17');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'embreo_dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-02 11:32:46
