-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lumii
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `ad_format`
--

DROP TABLE IF EXISTS `ad_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ad_format` (
  `ad_format_id` int NOT NULL AUTO_INCREMENT,
  `creative_strategy_submission_id` int DEFAULT NULL,
  `ad_format_name` varchar(255) DEFAULT NULL,
  `ad_format_selection` tinyint DEFAULT NULL,
  PRIMARY KEY (`ad_format_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ad_format`
--

LOCK TABLES `ad_format` WRITE;
/*!40000 ALTER TABLE `ad_format` DISABLE KEYS */;
/*!40000 ALTER TABLE `ad_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agency`
--

DROP TABLE IF EXISTS `agency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency` (
  `agency_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `subscription_plan_id` int DEFAULT NULL,
  `agency_tagline` varchar(255) DEFAULT NULL,
  `business_category` varchar(255) DEFAULT NULL,
  `agency_size` int DEFAULT NULL,
  `business_email` varchar(255) DEFAULT NULL,
  `agency_website_url` varchar(255) DEFAULT NULL,
  `agency_about` varchar(255) DEFAULT NULL,
  `agency_vision` varchar(255) DEFAULT NULL,
  `agency_mission` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`agency_id`),
  KEY `fk_agency_user_id` (`user_id`),
  CONSTRAINT `fk_agency_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency`
--

LOCK TABLES `agency` WRITE;
/*!40000 ALTER TABLE `agency` DISABLE KEYS */;
INSERT INTO `agency` VALUES (1,3,1,'Innovating Your Future','Tech',30,'business@domain.com','https://www.example.com','We are a tech-focused agency.','To lead in tech innovations.','Empowering businesses with technology.'),(2,12,1,'Innovating Your Future','Tech',30,'business@domain.com','https://www.example.com','We are a tech-focused agency.','To lead in tech innovations.','Empowering businesses with technology.'),(3,19,1,'Innovating Your Future','Tech',30,'business@domain.com','https://www.example.com','We are a tech-focused agency.','To lead in tech innovations.','Empowering businesses with technology.'),(4,21,1,'Innovating Your Future','Tech',30,'business@domain.com','https://www.example.com','We are a tech-focused agency.','To lead in tech innovations.','Empowering businesses with technology.'),(5,23,1,'Innovating Your Future','Tech',30,'business@domain.com','https://www.example.com','We are a tech-focused agency.','To lead in tech innovations.','Empowering businesses with technology.'),(6,25,1,'Innovating Your Future','Tech',30,'business@domain.com','https://www.example.com','We are a tech-focused agency.','To lead in tech innovations.','Empowering businesses with technology.');
/*!40000 ALTER TABLE `agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agency_user_details`
--

DROP TABLE IF EXISTS `agency_user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency_user_details` (
  `agency_user_details_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `agency_id` int DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `personal_email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `building` varchar(255) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_relationship` varchar(255) DEFAULT NULL,
  `emergency_contact_email` varchar(255) DEFAULT NULL,
  `emergency_contact_number` varchar(255) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `employment_type` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `work_hours` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`agency_user_details_id`),
  KEY `user_id` (`user_id`),
  KEY `agency_id` (`agency_id`),
  KEY `fk_agency_user_department_id` (`department_id`),
  KEY `fk_agency_user_role_id` (`role_id`),
  CONSTRAINT `agency_user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `agency_user_details_ibfk_2` FOREIGN KEY (`agency_id`) REFERENCES `agency` (`agency_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_agency_user_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_agency_user_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency_user_details`
--

LOCK TABLES `agency_user_details` WRITE;
/*!40000 ALTER TABLE `agency_user_details` DISABLE KEYS */;
INSERT INTO `agency_user_details` VALUES (2,18,2,'Test','Manager','test.manager@gmail.com','1234567890','1990-01-01','Downtown','Main Street','Building 101','Jane Manager','Spouse','jane.manager@gmail.com','0987654321',5,19,'Full-time','2025-01-20','10');
/*!40000 ALTER TABLE `agency_user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval_stage`
--

DROP TABLE IF EXISTS `approval_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_stage` (
  `approval_stage_id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `approver_level` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `rejection_reason` text,
  `approval_date` datetime DEFAULT NULL,
  PRIMARY KEY (`approval_stage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_stage`
--

LOCK TABLES `approval_stage` WRITE;
/*!40000 ALTER TABLE `approval_stage` DISABLE KEYS */;
/*!40000 ALTER TABLE `approval_stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `campaign_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `campaign_title` varchar(255) DEFAULT NULL,
  `campaign_description` varchar(255) DEFAULT NULL,
  `campaign_start_date` date DEFAULT NULL,
  `campaign_end_date` date DEFAULT NULL,
  `strategy_start_date` date DEFAULT NULL,
  `strategy_end_date` date DEFAULT NULL,
  `design_start_date` date DEFAULT NULL,
  `design_end_date` date DEFAULT NULL,
  `prototype_start_date` date DEFAULT NULL,
  `prototype_end_date` date DEFAULT NULL,
  `analysis_start_date` date DEFAULT NULL,
  `analysis_end_date` date DEFAULT NULL,
  `total_budget` decimal(10,0) DEFAULT NULL,
  `advertising_spend` decimal(10,0) DEFAULT NULL,
  `analytics_tools` decimal(10,0) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `campaign_activity` enum('Active','Closed') DEFAULT NULL,
  `campaign_status` enum('OnTrack','AtRisk','BehindSchedule') DEFAULT NULL,
  `campaign_phase` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`campaign_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_managers`
--

DROP TABLE IF EXISTS `campaign_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_managers` (
  `campaign_managers_id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`campaign_managers_id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `campaign_managers_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `campaign_managers_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_managers`
--

LOCK TABLES `campaign_managers` WRITE;
/*!40000 ALTER TABLE `campaign_managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign_managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_project_manager`
--

DROP TABLE IF EXISTS `campaign_project_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_project_manager` (
  `campaign_project_manager_id` int NOT NULL AUTO_INCREMENT,
  `project_manager_id` int DEFAULT NULL,
  `campaign_id` int DEFAULT NULL,
  PRIMARY KEY (`campaign_project_manager_id`),
  KEY `project_manager_id` (`project_manager_id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `campaign_project_manager_ibfk_1` FOREIGN KEY (`project_manager_id`) REFERENCES `project_manager` (`project_manager_id`),
  CONSTRAINT `campaign_project_manager_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_project_manager`
--

LOCK TABLES `campaign_project_manager` WRITE;
/*!40000 ALTER TABLE `campaign_project_manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign_project_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_request`
--

DROP TABLE IF EXISTS `campaign_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_request` (
  `campaign_request_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `campaign_title` varchar(255) DEFAULT NULL,
  `campaign_description` varchar(255) DEFAULT NULL,
  `campaign_start_date` date DEFAULT NULL,
  `campaign_end_date` date DEFAULT NULL,
  `strategy_start_date` date DEFAULT NULL,
  `strategy_end_date` date DEFAULT NULL,
  `design_start_date` date DEFAULT NULL,
  `design_end_date` date DEFAULT NULL,
  `prototype_start_date` date DEFAULT NULL,
  `prototype_end_date` date DEFAULT NULL,
  `analysis_start_date` date DEFAULT NULL,
  `analysis_end_date` date DEFAULT NULL,
  `total_budget` decimal(10,0) DEFAULT NULL,
  `advertising_spend` decimal(10,0) DEFAULT NULL,
  `analytics_tools` decimal(10,0) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `campaign_manager_id` int DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`campaign_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_request`
--

LOCK TABLES `campaign_request` WRITE;
/*!40000 ALTER TABLE `campaign_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_submission`
--

DROP TABLE IF EXISTS `campaign_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_submission` (
  `campaign_submission` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  PRIMARY KEY (`campaign_submission`),
  KEY `campaign_id` (`campaign_id`),
  KEY `submission_id` (`submission_id`),
  CONSTRAINT `campaign_submission_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `campaign_submission_ibfk_2` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_submission`
--

LOCK TABLES `campaign_submission` WRITE;
/*!40000 ALTER TABLE `campaign_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_teams`
--

DROP TABLE IF EXISTS `campaign_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_teams` (
  `campaign_teams_id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`campaign_teams_id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `campaign_teams_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `campaign_teams_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_teams`
--

LOCK TABLES `campaign_teams` WRITE;
/*!40000 ALTER TABLE `campaign_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) DEFAULT NULL,
  `agency_id` int DEFAULT NULL,
  `client_phone_number` varchar(255) DEFAULT NULL,
  `client_email` varchar(255) DEFAULT NULL,
  `client_website_url` varchar(255) DEFAULT NULL,
  `client_address` varchar(255) DEFAULT NULL,
  `client_industry` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  KEY `agency_id` (`agency_id`),
  CONSTRAINT `client_ibfk_1` FOREIGN KEY (`agency_id`) REFERENCES `agency` (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (2,'Test Client',5,'1234567890','test.client@example.com','http://testclient.com','123 Test Street','Marketing');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_campaign_details`
--

DROP TABLE IF EXISTS `client_campaign_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_campaign_details` (
  `client_campaign_details_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `campaign_id` int DEFAULT NULL,
  PRIMARY KEY (`client_campaign_details_id`),
  KEY `client_id` (`client_id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `client_campaign_details_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `client_campaign_details_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_campaign_details`
--

LOCK TABLES `client_campaign_details` WRITE;
/*!40000 ALTER TABLE `client_campaign_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_campaign_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_input_form`
--

DROP TABLE IF EXISTS `client_input_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_input_form` (
  `input_form_id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `brief` text,
  `status` enum('Submitted','Required','Draft') DEFAULT NULL,
  `brand_story` text,
  `products_services` text,
  `specifics` text,
  `usp` text,
  `logo` varchar(1000) DEFAULT NULL,
  `colors` text,
  `typography` text,
  `brand_personality` text,
  `ta_age` varchar(255) DEFAULT NULL,
  `ta_gender` varchar(255) DEFAULT NULL,
  `ta_income_level` varchar(255) DEFAULT NULL,
  `ta_location` varchar(255) DEFAULT NULL,
  `ta_interests` text,
  `ta_values` text,
  `ta_behaviours` text,
  `problems` text,
  `audience_base` varchar(1000) DEFAULT NULL,
  `primary_marketing_goal` text,
  `kpis` text,
  `competitors` text,
  `competitors_efforts` text,
  `different_approach` text,
  `services_expected` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `budget` decimal(10,0) DEFAULT NULL,
  `challenges` text,
  `inspiration` text,
  `phase_id` int DEFAULT NULL,
  PRIMARY KEY (`input_form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_input_form`
--

LOCK TABLES `client_input_form` WRITE;
/*!40000 ALTER TABLE `client_input_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_input_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_user_details`
--

DROP TABLE IF EXISTS `client_user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_user_details` (
  `client_user_details` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `campaign_id` int DEFAULT NULL,
  `client_representative_name` varchar(255) DEFAULT NULL,
  `client_representative_phone` varchar(45) DEFAULT NULL,
  `client_representative_email` varchar(255) DEFAULT NULL,
  `client_representative_position` varchar(255) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`client_user_details`),
  KEY `user_id` (`user_id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `client_user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `client_user_details_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_user_details`
--

LOCK TABLES `client_user_details` WRITE;
/*!40000 ALTER TABLE `client_user_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_type`
--

DROP TABLE IF EXISTS `content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_type` (
  `content_type_id` int NOT NULL AUTO_INCREMENT,
  `creative_strategy_submission_id` int DEFAULT NULL,
  `content_type_name` varchar(255) DEFAULT NULL,
  `content_type_selection` tinyint DEFAULT NULL,
  PRIMARY KEY (`content_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_type`
--

LOCK TABLES `content_type` WRITE;
/*!40000 ALTER TABLE `content_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creative_strategy_submission`
--

DROP TABLE IF EXISTS `creative_strategy_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creative_strategy_submission` (
  `creative_strategy_submission_id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  `ad_format_id` int DEFAULT NULL,
  `content_type_id` int DEFAULT NULL,
  `campaign_theme` text,
  `platforms` text,
  `influencers_collaboration` text,
  `brand_voice` text,
  `content_ideas` text,
  `content_goals` text,
  `target_audience_segmentation` text,
  `brief` text,
  PRIMARY KEY (`creative_strategy_submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creative_strategy_submission`
--

LOCK TABLES `creative_strategy_submission` WRITE;
/*!40000 ALTER TABLE `creative_strategy_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `creative_strategy_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Strategy'),(2,'Design'),(3,'Prototype'),(4,'Analysis'),(5,'Management '),(6,'Admin');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `github_submission`
--

DROP TABLE IF EXISTS `github_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `github_submission` (
  `github_submission_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  `github_submission_link` text,
  PRIMARY KEY (`github_submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `github_submission`
--

LOCK TABLES `github_submission` WRITE;
/*!40000 ALTER TABLE `github_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `github_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information_architecture_submission`
--

DROP TABLE IF EXISTS `information_architecture_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information_architecture_submission` (
  `information_architecture_submission_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  `user_flow_link` varchar(1000) DEFAULT NULL,
  `information_architecture_link` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`information_architecture_submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information_architecture_submission`
--

LOCK TABLES `information_architecture_submission` WRITE;
/*!40000 ALTER TABLE `information_architecture_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `information_architecture_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_manager_department_id` (`department_id`),
  CONSTRAINT `fk_manager_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `agency_user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `market_research_submission`
--

DROP TABLE IF EXISTS `market_research_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `market_research_submission` (
  `market_research_submission_id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  `mission_statement` text,
  `mission_statement_chart` varchar(1500) DEFAULT NULL,
  `internal_strength` text,
  `external_strength` text,
  `internal_weakness` text,
  `external_weakness` text,
  `internal_opportunities` text,
  `external_opportunities` text,
  `internal_threats` text,
  `external_threats` text,
  `chart_data` text,
  `swot_chart` varchar(1500) DEFAULT NULL,
  `segmentation` text,
  `targeting` text,
  `positioning` text,
  `stp_chart` varchar(1500) DEFAULT NULL,
  `product` text,
  `price` text,
  `place` text,
  `promotion` text,
  `four_ps_chart` varchar(1500) DEFAULT NULL,
  `key_performance_indicators` text,
  `kpi_chart` varchar(1500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `current_approver_level` int DEFAULT NULL,
  `version` int DEFAULT NULL,
  PRIMARY KEY (`market_research_submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `market_research_submission`
--

LOCK TABLES `market_research_submission` WRITE;
/*!40000 ALTER TABLE `market_research_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `market_research_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_id` int NOT NULL,
  `permission_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase`
--

DROP TABLE IF EXISTS `phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase` (
  `phase_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` enum('Strategy','Design','Prototype','Analysis') DEFAULT NULL,
  PRIMARY KEY (`phase_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
INSERT INTO `phase` VALUES (1,'Strategy'),(2,'Design'),(3,'Prototype'),(4,'Analysis');
/*!40000 ALTER TABLE `phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform_manager`
--

DROP TABLE IF EXISTS `platform_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform_manager` (
  `platform_manager_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `request_id` int DEFAULT NULL,
  PRIMARY KEY (`platform_manager_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `platform_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `agency_user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform_manager`
--

LOCK TABLES `platform_manager` WRITE;
/*!40000 ALTER TABLE `platform_manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `platform_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_manager`
--

DROP TABLE IF EXISTS `project_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_manager` (
  `project_manager_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `campaign_id` int DEFAULT NULL,
  `campaign_request_id` int DEFAULT NULL,
  PRIMARY KEY (`project_manager_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `agency_user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_manager`
--

LOCK TABLES `project_manager` WRITE;
/*!40000 ALTER TABLE `project_manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prototype_submission`
--

DROP TABLE IF EXISTS `prototype_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prototype_submission` (
  `prototype_submission_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  `prototype_submission_link` text,
  PRIMARY KEY (`prototype_submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prototype_submission`
--

LOCK TABLES `prototype_submission` WRITE;
/*!40000 ALTER TABLE `prototype_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `prototype_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendation_submission`
--

DROP TABLE IF EXISTS `recommendation_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendation_submission` (
  `recommendation_submission_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  `recommendation_submission` text,
  PRIMARY KEY (`recommendation_submission_id`),
  KEY `fk_recommendation_submission_phase_id` (`phase_id`),
  CONSTRAINT `fk_recommendation_submission_phase_id` FOREIGN KEY (`phase_id`) REFERENCES `phase` (`phase_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendation_submission`
--

LOCK TABLES `recommendation_submission` WRITE;
/*!40000 ALTER TABLE `recommendation_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `recommendation_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `project_manager_id` int DEFAULT NULL,
  `request_status` enum('Approved','Rejected') DEFAULT NULL,
  `request_type` varchar(255) DEFAULT NULL,
  `reason` text,
  PRIMARY KEY (`request_id`),
  KEY `project_manager_id` (`project_manager_id`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`project_manager_id`) REFERENCES `project_manager` (`project_manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `fk_role_department_id` (`department_id`),
  CONSTRAINT `fk_role_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Creative Strategist',1),(2,'Market Researcher',1),(3,'Technology Strtagetist',1),(4,'User Researcher',1),(5,'UX Designer',1),(6,'UI Designer',1),(7,'UX/UI Designer',2),(8,'Information Architect',2),(9,'Software Developer',3),(10,'Creative Designer',3),(11,'Data Analyst',4),(12,'Data Scientist',4),(13,'Project Manager',5),(14,'Researcher & Planning Manager',5),(15,'Creative Manager',5),(16,'Design Manager',5),(17,'Performance & Execution',5),(18,'Superadmin',5),(19,'Platform Manager',5),(20,'Client',5);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission` (
  `submission_id` int NOT NULL AUTO_INCREMENT,
  `submitter_id` int DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `submission_date` datetime DEFAULT NULL,
  `submission_status` enum('Approved','Rejected') DEFAULT NULL,
  PRIMARY KEY (`submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_phase`
--

DROP TABLE IF EXISTS `submission_phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission_phase` (
  `submission_phase_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`submission_phase_id`),
  KEY `submission_id` (`submission_id`),
  KEY `fk_submission_phase_id` (`phase_id`),
  CONSTRAINT `fk_submission_phase_id` FOREIGN KEY (`phase_id`) REFERENCES `phase` (`phase_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `submission_phase_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_phase`
--

LOCK TABLES `submission_phase` WRITE;
/*!40000 ALTER TABLE `submission_phase` DISABLE KEYS */;
/*!40000 ALTER TABLE `submission_phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_plan`
--

DROP TABLE IF EXISTS `subscription_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_plan` (
  `subscription_plan_id` int NOT NULL AUTO_INCREMENT,
  `subscription_plan_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subscription_plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plan`
--

LOCK TABLES `subscription_plan` WRITE;
/*!40000 ALTER TABLE `subscription_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscription_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `manager_id` int DEFAULT NULL,
  `team_title_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `team_description` varchar(255) DEFAULT NULL,
  `team_status` enum('Active','Inactive') DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `agency_id` int DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,25,3,5,'Development Team','Handles software development projects','Active','2025-01-21',NULL),(2,26,4,5,'Updated Development Team','Updated description','Inactive','2025-01-21',3);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_member`
--

DROP TABLE IF EXISTS `team_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_member` (
  `team_title_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int DEFAULT NULL,
  `team_title_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`team_title_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `team_member_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_member`
--

LOCK TABLES `team_member` WRITE;
/*!40000 ALTER TABLE `team_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_request`
--

DROP TABLE IF EXISTS `team_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_request` (
  `team_request_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `team_title_id` int DEFAULT NULL,
  `team_member_id` int DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `team_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`team_request_id`),
  KEY `request_id` (`request_id`),
  CONSTRAINT `team_request_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_request`
--

LOCK TABLES `team_request` WRITE;
/*!40000 ALTER TABLE `team_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_title`
--

DROP TABLE IF EXISTS `team_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_title` (
  `team_title_id` int NOT NULL AUTO_INCREMENT,
  `team_title_type` varchar(255) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`team_title_id`),
  KEY `fk_department_id` (`department_id`),
  CONSTRAINT `fk_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_title`
--

LOCK TABLES `team_title` WRITE;
/*!40000 ALTER TABLE `team_title` DISABLE KEYS */;
INSERT INTO `team_title` VALUES (1,'Strategy',1),(2,'Design',2),(3,'Prototype',3),(4,'Analysis',4);
/*!40000 ALTER TABLE `team_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technology_strategy_submission`
--

DROP TABLE IF EXISTS `technology_strategy_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technology_strategy_submission` (
  `technology_strategy_submission_id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  `technological_goals` text,
  `tools_technology` text,
  `automation_plan` text,
  `scalability_plan` text,
  `integration_approach` text,
  `security_measures` text,
  `potential_risks` text,
  `testing_strategy` text,
  `brief` text,
  PRIMARY KEY (`technology_strategy_submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technology_strategy_submission`
--

LOCK TABLES `technology_strategy_submission` WRITE;
/*!40000 ALTER TABLE `technology_strategy_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `technology_strategy_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `user_type` enum('Agency','Client') DEFAULT NULL,
  `requires_logout` tinyint DEFAULT NULL,
  `user_status` enum('Active','Inactive') DEFAULT 'Active',
  `user_role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'exampleUser','example@domain.com','$2a$10$CHTFdqJgIcAogv/kZptjZ.orHqfQM5CNz/gZbgrsyS0AUDKQI8NzC','Agency',0,'Active',18),(3,'exampleUser','example@domain.com','$2a$10$Ac1DH6ZK9kfML/v5/bYIIO2ltRv49cjCZQZ4pxql4LpBpeCv.Cz4y','Agency',0,'Active',18),(4,'platformManager1','pm1@agency.com','$2a$10$NCOpGVSIsQiBGkovg0AbzO7JcwWgjmqLToxRGo43oZK/JA2DckdKW','Agency',1,'Active',19),(5,'platformManager1','pm1@agency.com','$2a$10$K0.0n6B/BJ0CEoOVuYRxSOYfSZyNtaKUAwxKz94sYo0.HV/AtbHmm','Agency',1,'Active',19),(6,'platformManager1','pm1@agency.com','$2a$10$YjQj28yg0CrktHir2nazl.S6WXqiD76JdxGe7ruwLHoFH2RBvGUWa','Agency',1,'Active',19),(7,'platformManager3','pm3@agency.com','$2a$10$8Cc1Nw9jRepw8QiWnwYnf.7Ei2vdnoUfs2xK7vuYIVaVgtGmeUoni','Agency',1,'Active',19),(8,'platformManager3','pm3@agency.com','$2a$10$X2Egr4TS2Q9yYY121EGiT.4LZUC328y.xa./Dc3ZAXias26zGnPOq','Agency',1,'Active',19),(9,'platformManager3','pm3@agency.com','$2a$10$1AsL6ud597oXVbQhWeD0lOneaNwG4YjV81dzEby.Xv6snjUZmfE/a','Agency',1,'Active',19),(10,'platformManager3','pm3@agency.com','$2a$10$q7cXn280.eLR6rLaOGXIQOORzQVr.QYJjJWe8M9Sdd2eorb7e602O','Agency',1,'Active',19),(11,'platformManagerTest','pmtest@agency.com','$2a$10$Yyp17FhUvr8j00HVhRY7AeM6IOklTw8dGCKB8bSHQxZ8IfobVu6Ku','Agency',1,'Active',19),(12,'exampleUser2','example@domain.com','$2a$10$lDajfPxNSm5D5zB0O2mXCOih8QgHhI7/J8TKqyOn8uQ8BK9yJ4R9q','Agency',0,'Active',18),(13,'platformManagerTest','pmtest@agency.com','$2a$10$Q9NNZqV8oQ4W1dWHqOAFJ.Mj.Vy7HO.LftDBkxMDLUvTBCjmh9uGi','Agency',1,'Active',19),(14,'platformManagerTest','pmtest@agency.com','$2a$10$.nJLmwQA2wXthH6StB3Q8.gfcFlP4TWTre0eiBEjpiy/5LhOFKVD6','Agency',1,'Active',19),(15,'platformManagerTest23','pmtest@agency.com','$2a$10$bKq.Ye/56bSDLdTHyar4rePSeVZ9vmUu.mHQFPJYzG43xUpvhTYVS','Agency',1,'Active',19),(16,'platformManagerTest23','pmtest@agency.com','$2a$10$SOOo5YFT9xclNer/.chTQ.cpaY6fCsnPW4fcAAEoDV7R/7QzK5e8.','Agency',0,'Active',19),(18,'platformManagerTest24','pmtest@agency.com','$2a$10$iTnG6as.gInrctVZ3O4gWu3F8ZUkRUJQUSW7AcpOH6I6smomxLCYO','Agency',1,'Active',19),(19,'exampleUser3','example@domain.com','$2a$10$wmRzgVzAVDTddMe3LH0mw.b8XUVkBbqL73HFGgI6bA1hBm8LRKtjG','Agency',0,'Active',18),(21,'exampleUser4','example@domain.com','$2a$10$ZEXgXRBE8H/LD8uybY6aU.0HzpsZ6IfcFO7z5IG8Iir7KCOow1cjq','Agency',0,'Active',18),(22,'clientTest','client@test.com','$2a$10$s.Z3W9LimrSCUFt90sJwFuoYtU6Zelkx3EUTWPPrY9HT.CTuT.bCa','Client',1,'Active',20),(23,'exampleUser4','example@domain.com','$2a$10$dNPSPWv46JK5ZPAOdcLi/e2Bzjn9Skj/fv6HkkRz1Nc.YkCbVKh3G','Agency',0,'Active',18),(24,'clientTest','client@test.com','$2a$10$/ENcvJl9zjvDrUGZMQX91eRHZ0wP4S4FtdMRzkVfSxwejC.lESb..','Client',1,'Active',20),(25,'alex','example@alex.com','$2a$10$TUsWW04CbFzJJ1MsADAqLep.pck3wH2O8GdFjhSdVZYCqrbQ.9hPW','Agency',0,'Active',18);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_role_id` int NOT NULL AUTO_INCREMENT,
  `user_role_name` varchar(225) NOT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_by_dep`
--

DROP TABLE IF EXISTS `user_role_by_dep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role_by_dep` (
  `user_role_by_dep_id` int NOT NULL AUTO_INCREMENT,
  `user_role_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`user_role_by_dep_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_by_dep`
--

LOCK TABLES `user_role_by_dep` WRITE;
/*!40000 ALTER TABLE `user_role_by_dep` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role_by_dep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_permission`
--

DROP TABLE IF EXISTS `user_role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role_permission` (
  `user_role_permission_id` int NOT NULL AUTO_INCREMENT,
  `user_role_id` int DEFAULT NULL,
  `permission_id` int DEFAULT NULL,
  PRIMARY KEY (`user_role_permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_permission`
--

LOCK TABLES `user_role_permission` WRITE;
/*!40000 ALTER TABLE `user_role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ux_ui_design`
--

DROP TABLE IF EXISTS `ux_ui_design`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ux_ui_design` (
  `ux_ui_design_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int DEFAULT NULL,
  `submission_id` int DEFAULT NULL,
  `ux_link` text,
  `ui_link` text,
  `ux_ui_link` text,
  PRIMARY KEY (`ux_ui_design_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ux_ui_design`
--

LOCK TABLES `ux_ui_design` WRITE;
/*!40000 ALTER TABLE `ux_ui_design` DISABLE KEYS */;
/*!40000 ALTER TABLE `ux_ui_design` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-21 11:28:22
