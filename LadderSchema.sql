-- MySQL dump 10.13  Distrib 5.7.14, for Linux (x86_64)
--
-- Host: localhost    Database: Ladder
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Ladder`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Ladder` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `Ladder`;

--
-- Table structure for table `LdrApplications`
--

DROP TABLE IF EXISTS `LdrApplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrApplications` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `PostingID` varchar(36) DEFAULT NULL,
  `ApplicationStatus` tinyint(4) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrApplications`
--

LOCK TABLES `LdrApplications` WRITE;
/*!40000 ALTER TABLE `LdrApplications` DISABLE KEYS */;
INSERT INTO `LdrApplications` VALUES ('db832c80-859f-11e6-a202-4106874124de','6d319160-85a2-11e6-a202-4106874124de',4,'2016-09-30 01:23:36');
/*!40000 ALTER TABLE `LdrApplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrComments`
--

DROP TABLE IF EXISTS `LdrComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrComments` (
  `CommentID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `TopicID` varchar(36) DEFAULT NULL,
  `Body` varchar(512) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`CommentID`),
  KEY `TopicID` (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrComments`
--

LOCK TABLES `LdrComments` WRITE;
/*!40000 ALTER TABLE `LdrComments` DISABLE KEYS */;
INSERT INTO `LdrComments` VALUES ('2180a780-85a0-11e6-a202-4106874124de','941cc820-859e-11e6-a202-4106874124de','2016-09-28 17:22:28','21800b40-85a0-11e6-a202-4106874124de','Welcome to the Laddr forums! Check out some of the postings on the left, or How-To\'s to create a great resume and ace the interview! Good luck!',0),('d258b7f0-85a0-11e6-a202-4106874124de','d1ab72e0-859e-11e6-a202-4106874124de','2016-09-28 17:27:25','21800b40-85a0-11e6-a202-4106874124de','Thanks Greg! You\'re so smart!',0),('aa141310-85a1-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','2016-09-28 17:33:27','aa134fc0-85a1-11e6-a202-4106874124de','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',0);
/*!40000 ALTER TABLE `LdrComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrOrganizations`
--

DROP TABLE IF EXISTS `LdrOrganizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrOrganizations` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `OrganizationName` varchar(256) NOT NULL,
  `AddressLine1` varchar(256) NOT NULL,
  `AddressLine2` varchar(256) NOT NULL,
  `City` varchar(256) NOT NULL,
  `Province` varchar(25) NOT NULL,
  `Postal` varchar(10) NOT NULL,
  `URL` varchar(1024) NOT NULL,
  `MissionStatement` varchar(2048) NOT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrOrganizations`
--

LOCK TABLES `LdrOrganizations` WRITE;
/*!40000 ALTER TABLE `LdrOrganizations` DISABLE KEYS */;
INSERT INTO `LdrOrganizations` VALUES ('94fa8880-859f-11e6-a202-4106874124de','City of Mississauga','300 City Centre Dr, Mississauga, ON L5B 3C1, Canada','','','','','www.mississauga.ca/','City of Mississauga Mission Statement'),('db832c80-859f-11e6-a202-4106874124de','Trillium Health Partners','100 Queensway West Mississauga, ON L5B 1B8','','','','','www.mississauga.ca/','Trillium Helath Partners Mission Statement');
/*!40000 ALTER TABLE `LdrOrganizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrPostings`
--

DROP TABLE IF EXISTS `LdrPostings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrPostings` (
  `PostingID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(100) NOT NULL,
  `Location` varchar(200) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Timestamp` datetime NOT NULL,
  `Archived` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`PostingID`),
  KEY `organizationID` (`ProfileID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostings`
--

LOCK TABLES `LdrPostings` WRITE;
/*!40000 ALTER TABLE `LdrPostings` DISABLE KEYS */;
INSERT INTO `LdrPostings` VALUES ('6d319160-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Credit Valley Hospital','Assist clients navigating the hospital.','2016-09-28 17:38:54',0),('77cbcd20-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Mississauga Hospital','Assist clients navigating the hospital.','2016-09-28 17:39:12',0),('83539d30-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Queensway Hospital','Assist clients navigating the hospital.','2016-09-28 17:39:31',0);
/*!40000 ALTER TABLE `LdrPostings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrProfiles`
--

DROP TABLE IF EXISTS `LdrProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrProfiles` (
  `ProfileID` varchar(36) NOT NULL DEFAULT '',
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `PictureURL` varchar(1024) DEFAULT NULL,
  `Timestamp` datetime NOT NULL,
  `AccountType` int(11) NOT NULL,
  `TwitterID` varchar(256) DEFAULT NULL,
  `TwitterToken` varchar(255) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ProfileID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrProfiles`
--

LOCK TABLES `LdrProfiles` WRITE;
/*!40000 ALTER TABLE `LdrProfiles` DISABLE KEYS */;
INSERT INTO `LdrProfiles` VALUES ('941cc820-859e-11e6-a202-4106874124de','greg@laddr.xyz','$2a$10$/MxGWN2QS4SJignf9CcARe1M730mS/ZyVEs.3Y8w4lyiGTHQl1O1y','pic.jpg','2016-09-28 17:11:21',0,NULL,NULL,0),('a59f0d10-859e-11e6-a202-4106874124de','alan@laddr.xyz','$2a$10$nuDAVNgGZZltqP3iLB0OKenR3acMMEMniL0zDGrtpyYvMYuAF9EeS','pic.jpg','2016-09-28 17:11:51',0,NULL,NULL,0),('b94829a0-859e-11e6-a202-4106874124de','muska@laddr.xyz','$2a$10$r1FlSz4O56CE/Pw3Z8j7s.1GWSTNle1Cg/UZgMFF21IgyzuXiSs52','pic.jpg','2016-09-28 17:12:24',0,NULL,NULL,0),('d1ab72e0-859e-11e6-a202-4106874124de','peter@laddr.xyz','$2a$10$64rrY.eMzZJqFLMd6cbWxemwXuZLuNVsF15QKnl8rVbxdEF5FyO1y','pic.jpg','2016-09-28 17:13:05',0,NULL,NULL,0),('94fa8880-859f-11e6-a202-4106874124de','volunteering@mississauga.ca','$2a$10$ixNZnHLBEkNIx/fgA3Szpud2EXMf46P76Mjk3iBN/qyIn4lJykuwG','pic.jpg','2016-09-28 17:18:32',1,NULL,NULL,0),('db832c80-859f-11e6-a202-4106874124de','volunteering@trilliumhealthpartners.ca','$2a$10$ab1XmchPyoEISAf3KjAG4uAIV8QWC7rD2qz97Lczv323S40qEllKO','pic.jpg','2016-09-28 17:20:31',1,NULL,NULL,0);
/*!40000 ALTER TABLE `LdrProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrTopics`
--

DROP TABLE IF EXISTS `LdrTopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrTopics` (
  `TopicID` varchar(36) NOT NULL DEFAULT '',
  `Title` varchar(256) DEFAULT NULL,
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrTopics`
--

LOCK TABLES `LdrTopics` WRITE;
/*!40000 ALTER TABLE `LdrTopics` DISABLE KEYS */;
INSERT INTO `LdrTopics` VALUES ('21800b40-85a0-11e6-a202-4106874124de','Welcome to the Laddr forums!','941cc820-859e-11e6-a202-4106874124de','2016-09-28 17:22:28',0),('aa134fc0-85a1-11e6-a202-4106874124de','Stay tuned to Laddr for volunteering opportunities at Trillium Health Partners!','db832c80-859f-11e6-a202-4106874124de','2016-09-28 17:33:27',0);
/*!40000 ALTER TABLE `LdrTopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrUsers`
--

DROP TABLE IF EXISTS `LdrUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrUsers` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `FirstName` varchar(256) NOT NULL,
  `LastName` varchar(256) NOT NULL,
  `Description` varchar(2048) DEFAULT NULL,
  `Resume` varchar(2048) DEFAULT NULL,
  `AcademicStatus` tinyint(4) DEFAULT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrUsers`
--

LOCK TABLES `LdrUsers` WRITE;
/*!40000 ALTER TABLE `LdrUsers` DISABLE KEYS */;
INSERT INTO `LdrUsers` VALUES ('941cc820-859e-11e6-a202-4106874124de','Greg','Wood','description','resume',1),('a59f0d10-859e-11e6-a202-4106874124de','Alan','Simon','description','resume',1),('b94829a0-859e-11e6-a202-4106874124de','Muska','Ahmadzai','description','resume',1),('d1ab72e0-859e-11e6-a202-4106874124de','Peter','Phan','description','resume',1);
/*!40000 ALTER TABLE `LdrUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `TestLadder`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `TestLadder` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `TestLadder`;

--
-- Table structure for table `LdrApplications`
--

DROP TABLE IF EXISTS `LdrApplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrApplications` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `PostingID` varchar(36) DEFAULT NULL,
  `ApplicationStatus` tinyint(4) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrApplications`
--

LOCK TABLES `LdrApplications` WRITE;
/*!40000 ALTER TABLE `LdrApplications` DISABLE KEYS */;
INSERT INTO `LdrApplications` VALUES ('e0ad3250-86ad-11e6-8eb8-475aaea7f476','e35c73d0-86ad-11e6-8eb8-475aaea7f476',4,'2016-09-30 01:33:28');
/*!40000 ALTER TABLE `LdrApplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrComments`
--

DROP TABLE IF EXISTS `LdrComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrComments` (
  `CommentID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `TopicID` varchar(36) DEFAULT NULL,
  `Body` varchar(512) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`CommentID`),
  KEY `TopicID` (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrComments`
--

LOCK TABLES `LdrComments` WRITE;
/*!40000 ALTER TABLE `LdrComments` DISABLE KEYS */;
INSERT INTO `LdrComments` VALUES ('e1ccac10-86ad-11e6-8eb8-475aaea7f476','e0ad3250-86ad-11e6-8eb8-475aaea7f476','2016-09-30 01:33:25','e1cc0fd0-86ad-11e6-8eb8-475aaea7f476','This topic was creating during testing at Thu Sep 29 2016 21:33:25 GMT-0400 (EDT).',0),('e1f9af80-86ad-11e6-8eb8-475aaea7f476','e0ad3250-86ad-11e6-8eb8-475aaea7f476','2016-09-30 01:33:26','e1f93a50-86ad-11e6-8eb8-475aaea7f476','This topic was creating during testing at Thu Sep 29 2016 21:33:26 GMT-0400 (EDT).',0),('e2141550-86ad-11e6-8eb8-475aaea7f476','e0ad3250-86ad-11e6-8eb8-475aaea7f476','2016-09-30 01:33:26','e1f93a50-86ad-11e6-8eb8-475aaea7f476','This is a comment added by the unit tests at Thu Sep 29 2016 21:33:26 GMT-0400 (EDT).',0);
/*!40000 ALTER TABLE `LdrComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrOrganizations`
--

DROP TABLE IF EXISTS `LdrOrganizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrOrganizations` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `OrganizationName` varchar(256) NOT NULL,
  `AddressLine1` varchar(256) NOT NULL,
  `AddressLine2` varchar(256) NOT NULL,
  `City` varchar(256) NOT NULL,
  `Province` varchar(25) NOT NULL,
  `Postal` varchar(10) NOT NULL,
  `URL` varchar(1024) NOT NULL,
  `MissionStatement` varchar(2048) NOT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrOrganizations`
--

LOCK TABLES `LdrOrganizations` WRITE;
/*!40000 ALTER TABLE `LdrOrganizations` DISABLE KEYS */;
INSERT INTO `LdrOrganizations` VALUES ('e1391ea0-86ad-11e6-8eb8-475aaea7f476','Organization Name','123 Fake Organization Way','','','','','www.fakeorg.com','To be the fakest organization.'),('e14c5880-86ad-11e6-8eb8-475aaea7f476','Organization Name','123 Fake Organization Way','','','','','www.fakeorg.com','To be the fakest organization.');
/*!40000 ALTER TABLE `LdrOrganizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrPostings`
--

DROP TABLE IF EXISTS `LdrPostings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrPostings` (
  `PostingID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(100) NOT NULL,
  `Location` varchar(200) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Timestamp` datetime NOT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`PostingID`),
  KEY `organizationID` (`ProfileID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostings`
--

LOCK TABLES `LdrPostings` WRITE;
/*!40000 ALTER TABLE `LdrPostings` DISABLE KEYS */;
INSERT INTO `LdrPostings` VALUES ('e2481da0-86ad-11e6-8eb8-475aaea7f476','e1391ea0-86ad-11e6-8eb8-475aaea7f476','Test job title','Mississauga','A test job created in Mississauga','2016-09-30 01:33:26',1),('e35c73d0-86ad-11e6-8eb8-475aaea7f476','e1391ea0-86ad-11e6-8eb8-475aaea7f476','Applicant','Brampton','Apply to this job!','2016-09-30 01:33:28',0);
/*!40000 ALTER TABLE `LdrPostings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrProfiles`
--

DROP TABLE IF EXISTS `LdrProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrProfiles` (
  `ProfileID` varchar(36) NOT NULL DEFAULT '',
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `PictureURL` varchar(1024) DEFAULT NULL,
  `Timestamp` datetime NOT NULL,
  `AccountType` int(11) NOT NULL,
  `TwitterID` varchar(256) DEFAULT NULL,
  `TwitterToken` varchar(255) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ProfileID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrProfiles`
--

LOCK TABLES `LdrProfiles` WRITE;
/*!40000 ALTER TABLE `LdrProfiles` DISABLE KEYS */;
INSERT INTO `LdrProfiles` VALUES ('e0ad3250-86ad-11e6-8eb8-475aaea7f476','dat@boi.com','$2a$10$WhrGnn4gnFK.qQb1lPK.9.fkOXpN9kE3dgu9j3sKWPwatUE6wJJgC','somepic.jpg','2016-09-30 01:33:23',0,NULL,NULL,0),('e0c1a4b0-86ad-11e6-8eb8-475aaea7f476','user_to_be_deleted@gmail.com','$2a$10$rETH4.7H8lTt9IEsgbH8aO.9ysjrA.O/7arqA6ROwKzIbWukz2YkO','somepic.jpg','2016-09-30 01:33:23',0,NULL,NULL,1),('e1391ea0-86ad-11e6-8eb8-475aaea7f476','codebusters@laddr.xyz','$2a$10$Gi.7/0CIe4deChia87o1DOIXnpi1rYOApjmd3bjGG/oV0VMljPT3C','somepic.jpg','2016-09-30 01:33:24',1,NULL,NULL,0),('e14c5880-86ad-11e6-8eb8-475aaea7f476','to_be_deleted@gmail.com','$2a$10$Jaq4HnkgR/QUVuj3ckqWHON50aM6rWMBKW.6NpLLk.rdA1WTjcRYW','somepic.jpg','2016-09-30 01:33:24',1,NULL,NULL,1);
/*!40000 ALTER TABLE `LdrProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrTopics`
--

DROP TABLE IF EXISTS `LdrTopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrTopics` (
  `TopicID` varchar(36) NOT NULL DEFAULT '',
  `Title` varchar(256) DEFAULT NULL,
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrTopics`
--

LOCK TABLES `LdrTopics` WRITE;
/*!40000 ALTER TABLE `LdrTopics` DISABLE KEYS */;
INSERT INTO `LdrTopics` VALUES ('e1cc0fd0-86ad-11e6-8eb8-475aaea7f476','Topic created during testing','e0ad3250-86ad-11e6-8eb8-475aaea7f476','2016-09-30 01:33:25',1),('e1f93a50-86ad-11e6-8eb8-475aaea7f476','Topic created during testing','e0ad3250-86ad-11e6-8eb8-475aaea7f476','2016-09-30 01:33:26',0);
/*!40000 ALTER TABLE `LdrTopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrUsers`
--

DROP TABLE IF EXISTS `LdrUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrUsers` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `FirstName` varchar(256) NOT NULL,
  `LastName` varchar(256) NOT NULL,
  `Description` varchar(2048) DEFAULT NULL,
  `Resume` varchar(2048) DEFAULT NULL,
  `AcademicStatus` tinyint(4) DEFAULT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrUsers`
--

LOCK TABLES `LdrUsers` WRITE;
/*!40000 ALTER TABLE `LdrUsers` DISABLE KEYS */;
INSERT INTO `LdrUsers` VALUES ('e0ad3250-86ad-11e6-8eb8-475aaea7f476','Test','User','Test Description','Test Resume',1),('e0c1a4b0-86ad-11e6-8eb8-475aaea7f476','Deleted','User','Test Description','Test Resume',1);
/*!40000 ALTER TABLE `LdrUsers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-02 14:18:08
-- MySQL dump 10.13  Distrib 5.7.14, for Linux (x86_64)
--
-- Host: localhost    Database: Ladder
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Ladder`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Ladder` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `Ladder`;

--
-- Table structure for table `LdrApplications`
--

DROP TABLE IF EXISTS `LdrApplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrApplications` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `PostingID` varchar(36) DEFAULT NULL,
  `ApplicationStatus` tinyint(4) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrApplications`
--

LOCK TABLES `LdrApplications` WRITE;
/*!40000 ALTER TABLE `LdrApplications` DISABLE KEYS */;
INSERT INTO `LdrApplications` VALUES ('db832c80-859f-11e6-a202-4106874124de','6d319160-85a2-11e6-a202-4106874124de',4,'2016-09-30 01:23:36'),('941cc820-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',1,'2016-10-07 17:37:23'),('941cc820-859e-11e6-a202-4106874124de','6d319160-85a2-11e6-a202-4106874124de',0,'2016-10-07 18:40:05'),('941cc820-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',1,'2016-10-07 18:40:14'),('941cc820-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',1,'2016-10-07 18:44:34'),('a59f0d10-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',2,'2016-10-09 15:01:10'),('d1ab72e0-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',0,'2016-10-09 15:01:25'),('b94829a0-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',2,'2016-10-09 15:01:37');
/*!40000 ALTER TABLE `LdrApplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrComments`
--

DROP TABLE IF EXISTS `LdrComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrComments` (
  `CommentID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `TopicID` varchar(36) DEFAULT NULL,
  `Body` varchar(512) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`CommentID`),
  KEY `TopicID` (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrComments`
--

LOCK TABLES `LdrComments` WRITE;
/*!40000 ALTER TABLE `LdrComments` DISABLE KEYS */;
INSERT INTO `LdrComments` VALUES ('2180a780-85a0-11e6-a202-4106874124de','941cc820-859e-11e6-a202-4106874124de','2016-09-28 17:22:28','21800b40-85a0-11e6-a202-4106874124de','Welcome to the Laddr forums! Check out some of the postings on the left, or How-To\'s to create a great resume and ace the interview! Good luck!',0),('d258b7f0-85a0-11e6-a202-4106874124de','d1ab72e0-859e-11e6-a202-4106874124de','2016-09-28 17:27:25','21800b40-85a0-11e6-a202-4106874124de','Thanks Greg! You\'re so smart!',0),('aa141310-85a1-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','2016-09-28 17:33:27','aa134fc0-85a1-11e6-a202-4106874124de','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',0),('c2972d10-8cb7-11e6-b997-4563ed42a10b','941cc820-859e-11e6-a202-4106874124de','2016-10-07 17:59:15','21800b40-85a0-11e6-a202-4106874124de','Body of the comment.',0);
/*!40000 ALTER TABLE `LdrComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrOrganizations`
--

DROP TABLE IF EXISTS `LdrOrganizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrOrganizations` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `OrganizationName` varchar(256) NOT NULL,
  `AddressLine1` varchar(256) NOT NULL,
  `AddressLine2` varchar(256) DEFAULT NULL,
  `City` varchar(256) NOT NULL,
  `Province` varchar(25) NOT NULL,
  `Postal` varchar(10) NOT NULL,
  `URL` varchar(1024) NOT NULL,
  `MissionStatement` varchar(2048) NOT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrOrganizations`
--

LOCK TABLES `LdrOrganizations` WRITE;
/*!40000 ALTER TABLE `LdrOrganizations` DISABLE KEYS */;
INSERT INTO `LdrOrganizations` VALUES ('94fa8880-859f-11e6-a202-4106874124de','City of Mississauga','300 City Centre Dr','','Mississauga','on','L5B 3C1','www.mississauga.ca/','City of Mississauga Mission Statement'),('db832c80-859f-11e6-a202-4106874124de','Trillium Health Partners','100 Queensway West Mississauga, ON L5B 1B8','','','','','www.mississauga.ca/','Trillium Helath Partners Mission Statement'),('2585a760-88f5-11e6-bcd7-edcee89fbed0','Org1','123 Street','unit 2','Mississauga','on','A9A9A9','',''),('b4ab8c60-8996-11e6-97f4-c7317b673299','Organization','123 Street','Unit 1','Mississauga','on','A9A9A9','http://www.org.org','I wanna be the guy!');
/*!40000 ALTER TABLE `LdrOrganizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrPostings`
--

DROP TABLE IF EXISTS `LdrPostings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrPostings` (
  `PostingID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(100) NOT NULL,
  `Location` varchar(200) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Timestamp` datetime NOT NULL,
  `Archived` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`PostingID`),
  KEY `organizationID` (`ProfileID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostings`
--

LOCK TABLES `LdrPostings` WRITE;
/*!40000 ALTER TABLE `LdrPostings` DISABLE KEYS */;
INSERT INTO `LdrPostings` VALUES ('6d319160-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Credit Valley Hospital','Assist clients navigating the hospital.','2016-09-28 17:38:54',0),('77cbcd20-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Mississauga Hospital','Assist clients navigating the hospital.','2016-09-28 17:39:12',0),('83539d30-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Queensway Hospital','Assist clients navigating the hospital.','2016-09-28 17:39:31',0),('d1aff3b0-8c15-11e6-ab46-c1c679f41a16','94fa8880-859f-11e6-a202-4106874124de','Volunteer firefighter','Throughout Mississauga','This baby\'s on fire! Must bring own bucket full of water.','2016-10-06 22:40:02',0),('3ca83960-8e7e-11e6-aedf-179bc09bdd42','94fa8880-859f-11e6-a202-4106874124de','Volunteer lifeguard','South Common Community Center','Require a lifeguard for the weekly fun swim. Must be certified.','2016-10-10 00:12:31',0);
/*!40000 ALTER TABLE `LdrPostings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrProfiles`
--

DROP TABLE IF EXISTS `LdrProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrProfiles` (
  `ProfileID` varchar(36) NOT NULL DEFAULT '',
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `PictureURL` varchar(1024) DEFAULT NULL,
  `Timestamp` datetime NOT NULL,
  `AccountType` int(11) NOT NULL,
  `TwitterID` varchar(256) DEFAULT NULL,
  `TwitterToken` varchar(255) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ProfileID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrProfiles`
--

LOCK TABLES `LdrProfiles` WRITE;
/*!40000 ALTER TABLE `LdrProfiles` DISABLE KEYS */;
INSERT INTO `LdrProfiles` VALUES ('941cc820-859e-11e6-a202-4106874124de','greg@laddr.xyz','$2a$10$/MxGWN2QS4SJignf9CcARe1M730mS/ZyVEs.3Y8w4lyiGTHQl1O1y','pic.jpg','2016-09-28 17:11:21',0,NULL,NULL,0),('a59f0d10-859e-11e6-a202-4106874124de','alan@laddr.xyz','$2a$10$nuDAVNgGZZltqP3iLB0OKenR3acMMEMniL0zDGrtpyYvMYuAF9EeS','pic.jpg','2016-09-28 17:11:51',0,NULL,NULL,0),('b94829a0-859e-11e6-a202-4106874124de','muska@laddr.xyz','$2a$10$r1FlSz4O56CE/Pw3Z8j7s.1GWSTNle1Cg/UZgMFF21IgyzuXiSs52','pic.jpg','2016-09-28 17:12:24',0,NULL,NULL,0),('d1ab72e0-859e-11e6-a202-4106874124de','peter@laddr.xyz','$2a$10$64rrY.eMzZJqFLMd6cbWxemwXuZLuNVsF15QKnl8rVbxdEF5FyO1y','pic.jpg','2016-09-28 17:13:05',0,NULL,NULL,0),('94fa8880-859f-11e6-a202-4106874124de','volunteering@mississauga.ca','$2a$10$ixNZnHLBEkNIx/fgA3Szpud2EXMf46P76Mjk3iBN/qyIn4lJykuwG','pic.jpg','2016-09-28 17:18:32',1,NULL,NULL,0),('db832c80-859f-11e6-a202-4106874124de','volunteering@trilliumhealthpartners.ca','$2a$10$ab1XmchPyoEISAf3KjAG4uAIV8QWC7rD2qz97Lczv323S40qEllKO','pic.jpg','2016-09-28 17:20:31',1,NULL,NULL,0),('08bfe3d0-88f4-11e6-b628-71f025d18246','foo@bar.com','$2a$10$qDRlZFhrTWQY/MtpK.khiuFANF153j5fZR5nMTXdn7a/TPZxEY2mi','','2016-10-02 23:00:38',0,NULL,NULL,0),('2585a760-88f5-11e6-bcd7-edcee89fbed0','org@foobar.com','$2a$10$1GbrM.8/KWrzuxm2CTHv3unYhkkXC7u8ySOutqFd8xp42VOI9ecm.','','2016-10-02 23:08:35',1,NULL,NULL,0),('b4ab8c60-8996-11e6-97f4-c7317b673299','org@org.com','$2a$10$XGzQ.2cjiTuGXNwfrlMUU.apeGQv92GBBHrCADa.e2lZGpwfkQg3m','','2016-10-03 18:25:05',1,NULL,NULL,0),('cf6b1fb0-8997-11e6-abf7-f1b4d73eb3ae','vol@vol.com','$2a$10$.k78VYXWmr9GhHmxuV6WAuQeUS/p8SkJ/mb8NA0eY7yDnpKvTDTfu','pic.jpg','2016-10-03 18:32:59',0,NULL,NULL,0),('fbe6b480-89b7-11e6-a3f8-c3f1ab83fa78','greg@greg.com','$2a$10$fCJZDrR/wsuoP3R1f15hIeGWpgjp1M62L0a//AE3R.lInl7ZVqc.G','pic.jpg','2016-10-03 22:23:17',0,NULL,NULL,0),('5e393600-8a60-11e6-9733-bf6dc532ffd7','newvol@laddr.xyz','$2a$10$V4rhxNCpwhgLZ.IPkWUpz.hADAJvlqyHYKOTGrfSKUOkvPMBG/NGO','pic.jpg','2016-10-04 18:28:38',0,NULL,NULL,0);
/*!40000 ALTER TABLE `LdrProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrTopics`
--

DROP TABLE IF EXISTS `LdrTopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrTopics` (
  `TopicID` varchar(36) NOT NULL DEFAULT '',
  `Title` varchar(256) DEFAULT NULL,
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrTopics`
--

LOCK TABLES `LdrTopics` WRITE;
/*!40000 ALTER TABLE `LdrTopics` DISABLE KEYS */;
INSERT INTO `LdrTopics` VALUES ('21800b40-85a0-11e6-a202-4106874124de','Welcome to the Laddr forums!','941cc820-859e-11e6-a202-4106874124de','2016-09-28 17:22:28',0),('aa134fc0-85a1-11e6-a202-4106874124de','Stay tuned to Laddr for volunteering opportunities at Trillium Health Partners!','db832c80-859f-11e6-a202-4106874124de','2016-09-28 17:33:27',0);
/*!40000 ALTER TABLE `LdrTopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrUsers`
--

DROP TABLE IF EXISTS `LdrUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrUsers` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `FirstName` varchar(256) NOT NULL,
  `LastName` varchar(256) NOT NULL,
  `Description` varchar(2048) DEFAULT NULL,
  `Resume` varchar(2048) DEFAULT NULL,
  `AcademicStatus` tinyint(4) DEFAULT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrUsers`
--

LOCK TABLES `LdrUsers` WRITE;
/*!40000 ALTER TABLE `LdrUsers` DISABLE KEYS */;
INSERT INTO `LdrUsers` VALUES ('941cc820-859e-11e6-a202-4106874124de','Greg','Wood','Check out my other site: gregwood.tech!','resume',3),('a59f0d10-859e-11e6-a202-4106874124de','Alan','Simon','description','resume',1),('b94829a0-859e-11e6-a202-4106874124de','Muska','Ahmadzai','description','resume',1),('d1ab72e0-859e-11e6-a202-4106874124de','Peter','Phan','description','resume',1),('08bfe3d0-88f4-11e6-b628-71f025d18246','Foo','Bar','','',1),('cf6b1fb0-8997-11e6-abf7-f1b4d73eb3ae','First','Last','description','resume',1),('fbe6b480-89b7-11e6-a3f8-c3f1ab83fa78','greg','wood','description','resume',0),('5e393600-8a60-11e6-9733-bf6dc532ffd7','New','Volunteer','Description!','resume',4);
/*!40000 ALTER TABLE `LdrUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `TestLadder`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `TestLadder` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `TestLadder`;

--
-- Table structure for table `LdrApplications`
--

DROP TABLE IF EXISTS `LdrApplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrApplications` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `PostingID` varchar(36) DEFAULT NULL,
  `ApplicationStatus` tinyint(4) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrApplications`
--

LOCK TABLES `LdrApplications` WRITE;
/*!40000 ALTER TABLE `LdrApplications` DISABLE KEYS */;
INSERT INTO `LdrApplications` VALUES ('80bdabc0-8e84-11e6-81bf-3b02caf41966','8354d160-8e84-11e6-81bf-3b02caf41966',4,'2016-10-10 00:57:27');
/*!40000 ALTER TABLE `LdrApplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrComments`
--

DROP TABLE IF EXISTS `LdrComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrComments` (
  `CommentID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `TopicID` varchar(36) DEFAULT NULL,
  `Body` varchar(512) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`CommentID`),
  KEY `TopicID` (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrComments`
--

LOCK TABLES `LdrComments` WRITE;
/*!40000 ALTER TABLE `LdrComments` DISABLE KEYS */;
INSERT INTO `LdrComments` VALUES ('81d4e820-8e84-11e6-81bf-3b02caf41966','80bdabc0-8e84-11e6-81bf-3b02caf41966','2016-10-10 00:57:24','81d49a00-8e84-11e6-81bf-3b02caf41966','This topic was creating during testing at Sun Oct 09 2016 20:57:24 GMT-0400 (EDT).',0),('81fe6920-8e84-11e6-81bf-3b02caf41966','80bdabc0-8e84-11e6-81bf-3b02caf41966','2016-10-10 00:57:24','81fe1b00-8e84-11e6-81bf-3b02caf41966','This topic was creating during testing at Sun Oct 09 2016 20:57:24 GMT-0400 (EDT).',0),('8218a7e0-8e84-11e6-81bf-3b02caf41966','80bdabc0-8e84-11e6-81bf-3b02caf41966','2016-10-10 00:57:25','81fe1b00-8e84-11e6-81bf-3b02caf41966','This is a comment added by the unit tests at Sun Oct 09 2016 20:57:25 GMT-0400 (EDT).',0);
/*!40000 ALTER TABLE `LdrComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrOrganizations`
--

DROP TABLE IF EXISTS `LdrOrganizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrOrganizations` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `OrganizationName` varchar(256) NOT NULL,
  `AddressLine1` varchar(256) NOT NULL,
  `AddressLine2` varchar(256) DEFAULT NULL,
  `City` varchar(256) NOT NULL,
  `Province` varchar(25) NOT NULL,
  `Postal` varchar(10) NOT NULL,
  `URL` varchar(1024) NOT NULL,
  `MissionStatement` varchar(2048) NOT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrOrganizations`
--

LOCK TABLES `LdrOrganizations` WRITE;
/*!40000 ALTER TABLE `LdrOrganizations` DISABLE KEYS */;
INSERT INTO `LdrOrganizations` VALUES ('814fd9a0-8e84-11e6-81bf-3b02caf41966','Organization Name','123 Fake Organization Way','Unit 4','Mississauga','Ontario','A1B2C3','www.fakeorg.com','To be the fakest organization.'),('815c83d0-8e84-11e6-81bf-3b02caf41966','Organization Name','123 Fake Organization Way','Unit 4','Mississauga','Ontario','A1B2C3','www.fakeorg.com','To be the fakest organization.');
/*!40000 ALTER TABLE `LdrOrganizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrPostings`
--

DROP TABLE IF EXISTS `LdrPostings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrPostings` (
  `PostingID` varchar(36) NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(100) NOT NULL,
  `Location` varchar(200) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Timestamp` datetime NOT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`PostingID`),
  KEY `organizationID` (`ProfileID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostings`
--

LOCK TABLES `LdrPostings` WRITE;
/*!40000 ALTER TABLE `LdrPostings` DISABLE KEYS */;
INSERT INTO `LdrPostings` VALUES ('824dc1a0-8e84-11e6-81bf-3b02caf41966','814fd9a0-8e84-11e6-81bf-3b02caf41966','Test job title','Mississauga','A test job created in Mississauga','2016-10-10 00:57:25',1),('8354d160-8e84-11e6-81bf-3b02caf41966','814fd9a0-8e84-11e6-81bf-3b02caf41966','Applicant','Brampton','Apply to this job!','2016-10-10 00:57:27',0);
/*!40000 ALTER TABLE `LdrPostings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrProfiles`
--

DROP TABLE IF EXISTS `LdrProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrProfiles` (
  `ProfileID` varchar(36) NOT NULL DEFAULT '',
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `PictureURL` varchar(1024) DEFAULT NULL,
  `Timestamp` datetime NOT NULL,
  `AccountType` int(11) NOT NULL,
  `TwitterID` varchar(256) DEFAULT NULL,
  `TwitterToken` varchar(255) DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ProfileID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrProfiles`
--

LOCK TABLES `LdrProfiles` WRITE;
/*!40000 ALTER TABLE `LdrProfiles` DISABLE KEYS */;
INSERT INTO `LdrProfiles` VALUES ('80bdabc0-8e84-11e6-81bf-3b02caf41966','dat@boi.com','$2a$10$Sc5ICa2xSeUH3Wems17oF.0khkLO6uUprgOu3Ur7k9.PwTq8SZI/e','somepic.jpg','2016-10-10 00:57:22',0,NULL,NULL,0),('80d8d4e0-8e84-11e6-81bf-3b02caf41966','user_to_be_deleted@gmail.com','$2a$10$Ib2AEsUdnGG9MuUWn.UYL.O5s.RbNVdz6tHhwLtkCOav1SonQafVm','somepic.jpg','2016-10-10 00:57:22',0,NULL,NULL,1),('814fd9a0-8e84-11e6-81bf-3b02caf41966','codebusters@laddr.xyz','$2a$10$Rwp9B94i5Y9An5INVwt67uONL.FKhN2DOeJGc7gElspVo6ahngCsa','somepic.jpg','2016-10-10 00:57:23',1,NULL,NULL,0),('815c83d0-8e84-11e6-81bf-3b02caf41966','to_be_deleted@gmail.com','$2a$10$9y7abuW3EHWwuihIc2B/leWN9YwXGHZvq5MBtBiOZYiEPptlCYgrS','somepic.jpg','2016-10-10 00:57:23',1,NULL,NULL,1);
/*!40000 ALTER TABLE `LdrProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrTopics`
--

DROP TABLE IF EXISTS `LdrTopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrTopics` (
  `TopicID` varchar(36) NOT NULL DEFAULT '',
  `Title` varchar(256) DEFAULT NULL,
  `ProfileID` varchar(36) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `Archived` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`TopicID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrTopics`
--

LOCK TABLES `LdrTopics` WRITE;
/*!40000 ALTER TABLE `LdrTopics` DISABLE KEYS */;
INSERT INTO `LdrTopics` VALUES ('81d49a00-8e84-11e6-81bf-3b02caf41966','Topic created during testing','80bdabc0-8e84-11e6-81bf-3b02caf41966','2016-10-10 00:57:24',1),('81fe1b00-8e84-11e6-81bf-3b02caf41966','Topic created during testing','80bdabc0-8e84-11e6-81bf-3b02caf41966','2016-10-10 00:57:24',0);
/*!40000 ALTER TABLE `LdrTopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrUsers`
--

DROP TABLE IF EXISTS `LdrUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrUsers` (
  `ProfileID` varchar(36) DEFAULT NULL,
  `FirstName` varchar(256) NOT NULL,
  `LastName` varchar(256) NOT NULL,
  `Description` varchar(2048) DEFAULT NULL,
  `Resume` varchar(2048) DEFAULT NULL,
  `AcademicStatus` tinyint(4) DEFAULT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrUsers`
--

LOCK TABLES `LdrUsers` WRITE;
/*!40000 ALTER TABLE `LdrUsers` DISABLE KEYS */;
INSERT INTO `LdrUsers` VALUES ('80bdabc0-8e84-11e6-81bf-3b02caf41966','Test','User','Test Description','Test Resume',0),('80d8d4e0-8e84-11e6-81bf-3b02caf41966','Deleted','User','Test Description','Test Resume',0);
/*!40000 ALTER TABLE `LdrUsers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-09 21:01:01
