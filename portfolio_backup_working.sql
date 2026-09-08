-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `blog_post_tags`
--

DROP TABLE IF EXISTS `blog_post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_post_tags` (
  `blog_post_id` bigint NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tag_order` int NOT NULL,
  PRIMARY KEY (`blog_post_id`,`tag_order`),
  CONSTRAINT `FK9lwi4pg2kl7ce7pa3r3yotb9w` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`),
  CONSTRAINT `blog_post_tags_chk_1` CHECK ((`tag_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_post_tags`
--

LOCK TABLES `blog_post_tags` WRITE;
/*!40000 ALTER TABLE `blog_post_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `excerpt` varchar(255) NOT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `reading_time_minutes` int NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` enum('DRAFT','PUBLISHED') NOT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfmrqlsu8hgt4xyp3ewt66h287` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (2,'General','This is placeholder content so the Blog UI has something to render in Step 19. Replace it with an actual post whenever you\'re ready to write one.','2026-08-26 09:52:55.142805','Placeholder so the Blog UI has something real to render. Replace before going live.','2026-08-26 09:52:55.141802',1,'hello-world','PUBLISHED','Hello World','2026-08-26 09:52:55.142805'),(3,'Full Stack Development','## Why I rebuilt my portfolio as a full-stack app\n\nMost portfolios are static HTML. This one has a real **Spring Boot backend**, a **MySQL** database, and a proper REST API behind it.\n\n### The stack\n\n- React + Vite on the frontend\n- Spring Boot + Spring Data JPA on the backend\n- MySQL for persistence\n\nHere\'s the entity that started it all:\n\n```java\n@Entity\n@Table(name = \"projects\")\npublic class Project {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    private String title;\n}\n```\n\n> Placeholder content — replace this whole post with your real writeup once you\'re ready.\n\nCheck out the [GitHub repo](https://github.com/rohittarate121) for the source.','2026-08-26 10:08:05.736317','A short walkthrough of the stack and API design behind this site — placeholder, replace with your real writeup.','2026-08-26 10:08:05.736318',1,'how-i-built-this-portfolio','PUBLISHED','How I Built This Portfolio: React, Spring Boot, and MySQL','2026-09-02 08:10:02.835530');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `certificate_url` varchar(255) DEFAULT NULL,
  `credential_id` varchar(255) DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `display_order` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `verification_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
INSERT INTO `certifications` VALUES (1,'https://www.hackerrank.com/certificates/8d2a155e898e','8D2A155E898E','JAN-2026',1,'Software Engineer Certificate','HackerRank',NULL),(2,'https://certification.saviynt.com/128653c9-1333-4a40-a3d4-207f988c7ad8','171074728','DEC-2025',1,'Saviynt Identity Security for AI Age','Saviynt',NULL);
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (2,'2026-08-31 17:12:05.350097','recruiter@example.com','Hi Rohit, I saw your portfolio and would like to connect about an opening.','Test Recruiter',_binary '','Full Stack Developer Role'),(4,'2026-09-02 12:52:41.700324','dragon123@gmail.com','i want to connect with u please share more detail about what amount like what is ur rate?','dragon',_binary '','I want to modify my website ');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `degree` varchar(255) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `display_order` int NOT NULL,
  `institution` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Post Graduate Diploma in Advanced Computing (PG-DAC)',NULL,2,'Centre for Development of Advanced Computing (CDAC)','2026'),(2,'Bachelor of Engineering (B.E.) in Computer Science & Engineering','CGPA: 6.75 / 10',1,'Trinity Academy of Engineering, Savitribai Phule Pune University','2025');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_responsibilities`
--

DROP TABLE IF EXISTS `experience_responsibilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience_responsibilities` (
  `experience_id` bigint NOT NULL,
  `responsibility` text,
  `responsibility_order` int NOT NULL,
  PRIMARY KEY (`experience_id`,`responsibility_order`),
  CONSTRAINT `FKkj9lbt7aul51t05lpm7ppkbm3` FOREIGN KEY (`experience_id`) REFERENCES `experiences` (`id`),
  CONSTRAINT `experience_responsibilities_chk_1` CHECK ((`responsibility_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_responsibilities`
--

LOCK TABLES `experience_responsibilities` WRITE;
/*!40000 ALTER TABLE `experience_responsibilities` DISABLE KEYS */;
INSERT INTO `experience_responsibilities` VALUES (1,'Developed and maintained responsive web applications. Assisted in backend development and database integration. Fixed bugs and improved application functionality.',0),(2,'Performed data entry and maintained accurate records. Assisted in candidate sourcing and onboarding activities. Supported day-to-day operational tasks',0);
/*!40000 ALTER TABLE `experience_responsibilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_technologies`
--

DROP TABLE IF EXISTS `experience_technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience_technologies` (
  `experience_id` bigint NOT NULL,
  `technology` varchar(255) DEFAULT NULL,
  `technology_order` int NOT NULL,
  PRIMARY KEY (`experience_id`,`technology_order`),
  CONSTRAINT `FKf8eyd40oy053stj3tfse0yboh` FOREIGN KEY (`experience_id`) REFERENCES `experiences` (`id`),
  CONSTRAINT `experience_technologies_chk_1` CHECK ((`technology_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_technologies`
--

LOCK TABLES `experience_technologies` WRITE;
/*!40000 ALTER TABLE `experience_technologies` DISABLE KEYS */;
INSERT INTO `experience_technologies` VALUES (1,'Html, CSS, JavaScript, Node.js,',0);
/*!40000 ALTER TABLE `experience_technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `certificate_url` varchar(255) DEFAULT NULL,
  `display_order` int NOT NULL,
  `duration` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES (1,NULL,1,'3 months','Wisdom Sprouts','Web Development Intern'),(2,NULL,2,'1 year 2 months','Weekday (YC W21)','Data Intern');
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_api_endpoints`
--

DROP TABLE IF EXISTS `project_api_endpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_api_endpoints` (
  `project_id` bigint NOT NULL,
  `endpoint` varchar(255) DEFAULT NULL,
  `endpoint_order` int NOT NULL,
  PRIMARY KEY (`project_id`,`endpoint_order`),
  CONSTRAINT `FKc0b7oscxmrncbvc0lehpj6kkh` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_api_endpoints_chk_1` CHECK ((`endpoint_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_api_endpoints`
--

LOCK TABLES `project_api_endpoints` WRITE;
/*!40000 ALTER TABLE `project_api_endpoints` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_api_endpoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_features`
--

DROP TABLE IF EXISTS `project_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_features` (
  `project_id` bigint NOT NULL,
  `feature` text,
  `feature_order` int NOT NULL,
  PRIMARY KEY (`project_id`,`feature_order`),
  CONSTRAINT `FK58okhnl0y399a1gl4kmgl44xt` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_features_chk_1` CHECK ((`feature_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_features`
--

LOCK TABLES `project_features` WRITE;
/*!40000 ALTER TABLE `project_features` DISABLE KEYS */;
INSERT INTO `project_features` VALUES (2,'AI',0),(4,'Booking App',0);
/*!40000 ALTER TABLE `project_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_stack`
--

DROP TABLE IF EXISTS `project_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_stack` (
  `project_id` bigint NOT NULL,
  `technology` varchar(255) DEFAULT NULL,
  `stack_order` int NOT NULL,
  PRIMARY KEY (`project_id`,`stack_order`),
  CONSTRAINT `FKfaqntl9w4c6rg0kiu2tckirvf` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_stack_chk_1` CHECK ((`stack_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_stack`
--

LOCK TABLES `project_stack` WRITE;
/*!40000 ALTER TABLE `project_stack` DISABLE KEYS */;
INSERT INTO `project_stack` VALUES (2,'Java, Spring Boot, React.js, Microservices, Docker, Kubernetes, Jenkins, MySQL, etc',0),(4,'React.js, Node.js, Express.js, MongoDB, JWT, TMDB API, Stripe',0);
/*!40000 ALTER TABLE `project_stack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `architecture` varchar(255) DEFAULT NULL,
  `challenges` text,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `featured` bit(1) NOT NULL,
  `future_improvements` text,
  `github_url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `learnings` text,
  `live_url` varchar(255) DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcxqk67qijm09gpgig8a997mb0` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (2,'Browser -> REST API Gateway -> Spring Boot Microservices -> MySQL',NULL,'2026-08-21 09:52:44.991271','A microservices-based full-stack application for managing patients, doctors, and appointments, with secure authentication and modern DevOps deployment practices.',_binary '',NULL,'https://github.com/rohittarate121/Smart-Healthcare-Management-System',NULL,NULL,'https://smart-healthcare-management-system-weld.vercel.app/','AI-powered Electronic Health Records platform','smart-healthcare-management-system','Smart Healthcare Management System','2026-09-08 18:48:43.987520'),(3,'Browser -> REST API -> Express.js -> MySQL',NULL,'2026-08-21 09:53:01.268007','An inventory management system for B2B use cases — product management, stock tracking, and low-stock alerting, built on a REST API backend.',_binary '\0',NULL,NULL,NULL,NULL,NULL,'B2B Inventory Management System','stockflow','StockFlow','2026-08-21 09:53:01.268007'),(4,'Browser (React) -> REST API -> Express.js -> MongoDB',NULL,'2026-08-21 09:53:12.918939','A responsive movie ticket booking platform built on the MERN stack, with seat selection, authentication, and payment integration.',_binary '',NULL,'https://github.com/rohittarate121/Quickshow',NULL,NULL,'https://quickshow-sand.vercel.app/','Full-Stack Movie Ticket Booking App','quickshow','QuickShow','2026-09-08 18:49:15.498213');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume`
--

DROP TABLE IF EXISTS `resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `resume_url` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume`
--

LOCK TABLES `resume` WRITE;
/*!40000 ALTER TABLE `resume` DISABLE KEYS */;
INSERT INTO `resume` VALUES (1,'https://docs.google.com/document/d/1BJZzGP1C1KqjOW7lzuapLYNASRn7DhW-kn9fnViz324/edit?usp=sharing','2026-09-02 08:50:03.394844');
/*!40000 ALTER TABLE `resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `display_order` int NOT NULL,
  `level` enum('PRIMARY','STRONG','WORKING_KNOWLEDGE') NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Programming',1,'WORKING_KNOWLEDGE','Java'),(2,'Programming',2,'STRONG','JavaScript'),(3,'Programming',3,'WORKING_KNOWLEDGE','C++'),(4,'Programming',4,'WORKING_KNOWLEDGE','C#'),(5,'Programming',5,'STRONG','SQL'),(6,'Backend',6,'PRIMARY','Spring Boot'),(7,'Backend',7,'STRONG','Spring Security'),(8,'Backend',8,'STRONG','Spring MVC'),(9,'Backend',9,'STRONG','Hibernate / JPA'),(10,'Backend',10,'STRONG','Node.js'),(11,'Backend',11,'STRONG','Express.js'),(12,'Backend',12,'PRIMARY','REST API Design'),(13,'Backend',13,'WORKING_KNOWLEDGE','Microservices'),(14,'Backend',14,'STRONG','JWT Authentication'),(15,'Frontend',15,'PRIMARY','React.js'),(16,'Frontend',16,'STRONG','Redux Toolkit'),(17,'Frontend',17,'STRONG','React Router'),(18,'Frontend',18,'STRONG','Tailwind CSS'),(19,'Frontend',19,'STRONG','HTML5 / CSS3'),(20,'Frontend',20,'WORKING_KNOWLEDGE','Bootstrap'),(21,'Database',21,'PRIMARY','MySQL'),(22,'Database',22,'STRONG','Oracle SQL / PL-SQL'),(23,'Database',23,'STRONG','MongoDB'),(24,'Cloud, DevOps & Tools',24,'STRONG','Docker'),(25,'Cloud, DevOps & Tools',25,'WORKING_KNOWLEDGE','Kubernetes'),(26,'Cloud, DevOps & Tools',26,'WORKING_KNOWLEDGE','Jenkins'),(27,'Cloud, DevOps & Tools',27,'WORKING_KNOWLEDGE','Microsoft Azure'),(28,'Cloud, DevOps & Tools',28,'PRIMARY','Git & GitHub'),(29,'Cloud, DevOps & Tools',29,'STRONG','Postman / Swagger'),(30,'Cloud, DevOps & Tools',30,'STRONG','Maven'),(31,'Testing & QA',31,'WORKING_KNOWLEDGE','JUnit / Mockito'),(32,'Testing & QA',32,'WORKING_KNOWLEDGE','Selenium WebDriver'),(33,'Computer Science',33,'STRONG','Data Structures & Algorithms'),(34,'Computer Science',34,'PRIMARY','Object-Oriented Programming'),(35,'Computer Science',35,'STRONG','DBMS'),(36,'Computer Science',36,'WORKING_KNOWLEDGE','Operating Systems'),(37,'Computer Science',37,'WORKING_KNOWLEDGE','Computer Networks');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN') NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-08-27 11:45:43.028038','$2a$10$yvtBtBaVeDJOiyP6X4qUWuJFyQOL64iIyvg5qA/gJ9R5awxtWMOLW','ADMIN','admin');
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

-- Dump completed on 2026-09-09  0:25:21
