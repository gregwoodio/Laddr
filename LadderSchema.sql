-- MySQL dump 10.13  Distrib 5.7.15, for Linux (x86_64)
--
-- Host: localhost    Database: Ladder
-- ------------------------------------------------------
-- Server version	5.7.15

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
INSERT INTO `LdrApplications` VALUES ('941cc820-859e-11e6-a202-4106874124de','d1aff3b0-8c15-11e6-ab46-c1c679f41a16',2,'2016-10-12 14:59:36'),('941cc820-859e-11e6-a202-4106874124de','3ca83960-8e7e-11e6-aedf-179bc09bdd42',0,'2016-10-12 15:00:29'),('941cc820-859e-11e6-a202-4106874124de','6d319160-85a2-11e6-a202-4106874124de',0,'2016-10-12 15:00:40'),('941cc820-859e-11e6-a202-4106874124de','43dd9ee0-90a5-11e6-97ce-5dec9f3e43b3',1,'2016-10-13 21:08:39'),('941cc820-859e-11e6-a202-4106874124de','c6bf8bd0-931f-11e6-8d59-4b2ff21c0a19',0,'2016-10-16 19:29:44'),('b94829a0-859e-11e6-a202-4106874124de','6a8cf370-a11b-11e6-96d4-674ccfffee71',0,'2016-11-02 17:05:21'),('941cc820-859e-11e6-a202-4106874124de','473462e0-a12b-11e6-90df-073e6b5acb29',2,'2016-11-02 18:37:32');
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
INSERT INTO `LdrComments` VALUES ('2180a780-85a0-11e6-a202-4106874124de','941cc820-859e-11e6-a202-4106874124de','2016-09-28 17:22:28','21800b40-85a0-11e6-a202-4106874124de','Welcome to the Laddr forums! Check out some of the postings on the left, or How-To\'s to create a great resume and ace the interview! Good luck!',0),('d258b7f0-85a0-11e6-a202-4106874124de','d1ab72e0-859e-11e6-a202-4106874124de','2016-09-28 17:27:25','21800b40-85a0-11e6-a202-4106874124de','Thanks Greg! You\'re so smart!',0),('aa141310-85a1-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','2016-09-28 17:33:27','aa134fc0-85a1-11e6-a202-4106874124de','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',0),('c2972d10-8cb7-11e6-b997-4563ed42a10b','941cc820-859e-11e6-a202-4106874124de','2016-10-07 17:59:15','21800b40-85a0-11e6-a202-4106874124de','Body of the comment.',0),('0e8977a0-8f29-11e6-a2cf-77a6cfa54af8','941cc820-859e-11e6-a202-4106874124de','2016-10-10 20:35:18','aa134fc0-85a1-11e6-a202-4106874124de','Sounds great! I can\'t wait to see what comes up!',0),('27150960-8f29-11e6-a2cf-77a6cfa54af8','db832c80-859f-11e6-a202-4106874124de','2016-10-10 20:35:59','aa134fc0-85a1-11e6-a202-4106874124de','A reply to a user from an organization....',0),('4183c2c0-9189-11e6-9750-cff8cc027387','941cc820-859e-11e6-a202-4106874124de','2016-10-13 21:08:57','aa134fc0-85a1-11e6-a202-4106874124de','Another reply...',0),('1ebfa070-918d-11e6-bc1d-f35604a65aa3','941cc820-859e-11e6-a202-4106874124de','2016-10-13 21:36:37','1ebb5ab0-918d-11e6-bc1d-f35604a65aa3','asdfasdfasd',0);
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
  `Lat` double(16,14) DEFAULT NULL,
  `Lng` double(16,14) DEFAULT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrOrganizations`
--

LOCK TABLES `LdrOrganizations` WRITE;
/*!40000 ALTER TABLE `LdrOrganizations` DISABLE KEYS */;
INSERT INTO `LdrOrganizations` VALUES ('94fa8880-859f-11e6-a202-4106874124de','City of Mississauga','300 City Centre Drive','','Mississauga','ON','L5B 2G6','www.mississauga.ca/','City of Mississauga Mission Statement',43.58877160000001,-79.64439469999999),('db832c80-859f-11e6-a202-4106874124de','Trillium Health Partners','100 Queensway West Mississauga, ON L5B 1B8','','','','','www.mississauga.ca/','Trillium Helath Partners Mission Statement',43.58877160000001,-79.64439469999999),('2585a760-88f5-11e6-bcd7-edcee89fbed0','Org1','123 Street','unit 2','Mississauga','on','A9A9A9','','',43.58877160000001,-79.64439469999999),('b4ab8c60-8996-11e6-97f4-c7317b673299','Organization','123 Street','Unit 1','Mississauga','on','A9A9A9','http://www.org.org','I wanna be the guy!',43.58877160000001,-79.64439469999999),('1e130fd0-90a8-11e6-a247-2baa0b9ef93d','asdf','asdf','','asdf','ab','asdfasdf','','',43.58877160000001,-79.64439469999999),('69d00980-921c-11e6-a44a-f125eb084a6a','Bike Pirates','1416 Queen Street West','','Toronto','ON','M6K 1L9','http://bikepirates.com/','BIKE PIRATES IS a volunteer-run organization that provides a Do-It-Yourself workspace where you can:\nLearn bicycle maintenance\nWork on your own bike on a drop-in basis\nBuild up a new bicycle from scratch\nWe also sell new and used parts, and even fully refurbished used bicycles.',43.64112570000000,-79.43482560000000);
/*!40000 ALTER TABLE `LdrOrganizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrPostingTags`
--

DROP TABLE IF EXISTS `LdrPostingTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrPostingTags` (
  `PostingID` varchar(36) CHARACTER SET utf8 DEFAULT '',
  `TagID` int(11) NOT NULL,
  `PostingTagID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`PostingTagID`),
  KEY `TagID` (`TagID`),
  KEY `fk_ldr_posting_tags` (`PostingID`),
  CONSTRAINT `LdrPostingTags_ibfk_1` FOREIGN KEY (`TagID`) REFERENCES `LdrTags` (`TagID`),
  CONSTRAINT `fk_ldr_posting_tags` FOREIGN KEY (`PostingID`) REFERENCES `LdrPostings` (`PostingID`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostingTags`
--

LOCK TABLES `LdrPostingTags` WRITE;
/*!40000 ALTER TABLE `LdrPostingTags` DISABLE KEYS */;
INSERT INTO `LdrPostingTags` VALUES ('473462e0-a12b-11e6-90df-073e6b5acb29',5,31),('473462e0-a12b-11e6-90df-073e6b5acb29',16,32),('473462e0-a12b-11e6-90df-073e6b5acb29',21,33),('473462e0-a12b-11e6-90df-073e6b5acb29',24,34),('72cf5ac0-a092-11e6-87e8-d1251eecaf1a',3,35),('72cf5ac0-a092-11e6-87e8-d1251eecaf1a',6,36),('72cf5ac0-a092-11e6-87e8-d1251eecaf1a',9,37),('72cf5ac0-a092-11e6-87e8-d1251eecaf1a',12,38),('68db9500-a08e-11e6-b520-bd4032fc86c6',11,39),('68db9500-a08e-11e6-b520-bd4032fc86c6',14,40),('68db9500-a08e-11e6-b520-bd4032fc86c6',17,41),('68db9500-a08e-11e6-b520-bd4032fc86c6',25,42),('6a8cf370-a11b-11e6-96d4-674ccfffee71',1,43),('6a8cf370-a11b-11e6-96d4-674ccfffee71',5,44),('6a8cf370-a11b-11e6-96d4-674ccfffee71',27,45),('f9877fc0-a119-11e6-b2f5-bd12b94782c3',17,46),('f9877fc0-a119-11e6-b2f5-bd12b94782c3',22,47),('f9877fc0-a119-11e6-b2f5-bd12b94782c3',26,48),('f9877fc0-a119-11e6-b2f5-bd12b94782c3',27,49);
/*!40000 ALTER TABLE `LdrPostingTags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrPostings`
--

DROP TABLE IF EXISTS `LdrPostings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrPostings` (
  `PostingID` varchar(36) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `ProfileID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(100) NOT NULL,
  `Location` varchar(200) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Timestamp` datetime NOT NULL,
  `Archived` tinyint(1) DEFAULT NULL,
  `Lat` double(16,14) DEFAULT NULL,
  `Lng` double(16,14) DEFAULT NULL,
  PRIMARY KEY (`PostingID`),
  KEY `organizationID` (`ProfileID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostings`
--

LOCK TABLES `LdrPostings` WRITE;
/*!40000 ALTER TABLE `LdrPostings` DISABLE KEYS */;
INSERT INTO `LdrPostings` VALUES ('1c8817a0-a08e-11e6-97fb-0344b0ef6d82','94fa8880-859f-11e6-a202-4106874124de','qazwsx','300 City Centre Drive, Mississauga, ON, L5B 2G6','qazwsx','2016-11-01 23:51:30',0,43.58877160000001,-79.64439469999999),('206a65d0-9233-11e6-9619-9db67650c342','69d00980-921c-11e6-a44a-f125eb084a6a','Mississauga Bike Co-op','100 City Centre Dr, Mississauga, ON L5B 2C9, Canada','We\'re setting up a Bike Co-op at all the Sheridan College campuses.','2016-10-14 17:24:56',0,NULL,NULL),('268a07d0-a08a-11e6-853e-4b801ab70354','94fa8880-859f-11e6-a202-4106874124de','Job Skills training for homeless people','300 City Centre Drive, Mississauga, ON, L5B 2G6','Job Skills training for homeless people','2016-11-01 23:23:09',0,43.58877160000001,-79.64439469999999),('305e02d0-a089-11e6-8ff7-a959955b303d','94fa8880-859f-11e6-a202-4106874124de','Seniors Computer teacher','300 City Centre Drive, Mississauga, ON, L5B 2G6','Help a senior learn the basics of computer use.','2016-11-01 23:16:16',0,43.58877160000001,-79.64439469999999),('350ad720-a08b-11e6-b40b-713bf426156d','94fa8880-859f-11e6-a202-4106874124de','asdf','300 City Centre Drive, Mississauga, ON, L5B 2G6','asdf','2016-11-01 23:30:43',0,43.58877160000001,-79.64439469999999),('3b0c4980-a08e-11e6-9769-af533c0abf3d','94fa8880-859f-11e6-a202-4106874124de','qazwsx','300 City Centre Drive, Mississauga, ON, L5B 2G6','qazwsx','2016-11-01 23:52:21',0,43.58877160000001,-79.64439469999999),('3ca83960-8e7e-11e6-aedf-179bc09bdd42','94fa8880-859f-11e6-a202-4106874124de','Volunteer lifeguard','South Common Community Center','Require a lifeguard for the weekly fun swim. Must be certified.','2016-10-10 00:12:31',0,NULL,NULL),('43dd9ee0-90a5-11e6-97ce-5dec9f3e43b3','94fa8880-859f-11e6-a202-4106874124de','Senior assistance','Mississauga','Help out with some seniors in your area.','2016-10-12 17:56:56',0,NULL,NULL),('473462e0-a12b-11e6-90df-073e6b5acb29','94fa8880-859f-11e6-a202-4106874124de','Editor in Chief','300 Lakeshore Rd W, Mississauga, ON L5H 1G6, Canada','testing testing testing.','2016-11-02 18:36:33',0,43.58877160000001,-79.64439469999999),('4d68e8e0-a08e-11e6-a39c-07c041e82009','94fa8880-859f-11e6-a202-4106874124de','qaz','300 City Centre Drive, Mississauga, ON, L5B 2G6','qaz','2016-11-01 23:52:52',0,43.58877160000001,-79.64439469999999),('4ef0e170-9235-11e6-bc8b-bf5afeac311b','69d00980-921c-11e6-a44a-f125eb084a6a','Man on bike','1416 Queen Street West, Toronto, ON, M6K 1L9','Be a man on a bike','2016-10-14 17:40:33',0,43.64112570000000,-79.43482560000000),('52c0eaf0-a088-11e6-9f02-3ff498c6c2f2','94fa8880-859f-11e6-a202-4106874124de','Youth Group leader','300 City Centre Drive, Mississauga, ON, L5B 2G6','Erin Mills United requires a Youth Group leader for Monday nights at 7-9 PM.','2016-11-01 23:10:04',0,43.58877160000001,-79.64439469999999),('59753620-9233-11e6-af05-2f34e483e7cf','69d00980-921c-11e6-a44a-f125eb084a6a','Volunteer Mechanic','1416 Queen Street West, Toronto, ON, M6K 1L9','Fix some bikes.','2016-10-14 17:26:32',0,NULL,NULL),('68db9500-a08e-11e6-b520-bd4032fc86c6','94fa8880-859f-11e6-a202-4106874124de','foobar','300 City Centre Drive, Mississauga, ON, L5B 2G6','foobar','2016-11-01 23:53:38',0,43.58877160000001,-79.64439469999999),('6a646720-90a4-11e6-97ce-5dec9f3e43b3','94fa8880-859f-11e6-a202-4106874124de','Food bank volunteer','Mississauga food bank','Flooby dooby doo','2016-10-12 17:50:51',0,NULL,NULL),('6a8cf370-a11b-11e6-96d4-674ccfffee71','69d00980-921c-11e6-a44a-f125eb084a6a','another bike volunteer','1416 Queen Street West, Toronto, ON, M6K 1L9','another bike volunteer','2016-11-02 16:43:00',0,43.64112570000000,-79.43482560000000),('6d319160-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Credit Valley Hospital','Assist clients navigating the hospital.','2016-09-28 17:38:54',0,NULL,NULL),('72cf5ac0-a092-11e6-87e8-d1251eecaf1a','94fa8880-859f-11e6-a202-4106874124de','Living Arts Center Volunteer','4141 Living Arts Dr, Mississauga, ON L5B 0A1, Canada','qwerty','2016-11-02 00:22:33',0,43.58877160000001,-79.64439469999999),('77cbcd20-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Mississauga Hospital','Assist clients navigating the hospital.','2016-09-28 17:39:12',0,NULL,NULL),('782ca270-9232-11e6-a760-e3a0beae71ac','69d00980-921c-11e6-a44a-f125eb084a6a','Sheridan Bike Repair','Sheridan College Dr, Brampton, ON L6Y, Canada','We\'re setting up a bike repair stand at Sheridan and are looking for volunteers. Tools are provided!','2016-10-14 17:20:14',0,NULL,NULL),('83539d30-85a2-11e6-a202-4106874124de','db832c80-859f-11e6-a202-4106874124de','Client Care Volunteer','Queensway Hospital','Assist clients navigating the hospital.','2016-09-28 17:39:31',0,NULL,NULL),('8b9c9bb0-9234-11e6-bc8b-bf5afeac311b','94fa8880-859f-11e6-a202-4106874124de','Some other volunteer','300 City Centre Dr, Mississauga, ON L5B 2G6, Canada','This is another posting','2016-10-14 17:35:05',0,43.58877160000001,-79.64439469999999),('8c42c080-90a4-11e6-97ce-5dec9f3e43b3','94fa8880-859f-11e6-a202-4106874124de','Dogsitter','Humane Society','Sit on some dogs.','2016-10-12 17:51:48',0,NULL,NULL),('9afce4c0-90a4-11e6-97ce-5dec9f3e43b3','94fa8880-859f-11e6-a202-4106874124de','Cat sitter','Humane Society','Sit on some cats','2016-10-12 17:52:13',0,NULL,NULL),('afb64360-90a5-11e6-b19d-e13ac7e75b20','94fa8880-859f-11e6-a202-4106874124de','Park cleanup volunteer','Lakeshore park','We\'re cleaning up Lakeshore park on Saturday. Come out and help, garbage bags are provided.','2016-10-12 17:59:57',0,NULL,NULL),('afbaa150-9233-11e6-8ef5-d99022a1da8f','69d00980-921c-11e6-a44a-f125eb084a6a','Foo Bar','100 City Centre Dr, Mississauga, ON L5B 2C9, Canada','foo bar baz','2016-10-14 17:28:57',0,NULL,NULL),('b1527bd0-a08b-11e6-912a-b150558cc6d9','94fa8880-859f-11e6-a202-4106874124de','qwer','300 City Centre Drive, Mississauga, ON, L5B 2G6','qwer','2016-11-01 23:34:11',0,43.58877160000001,-79.64439469999999),('b4427030-922f-11e6-bbaa-e71f38543369','69d00980-921c-11e6-a44a-f125eb084a6a','Co-op Volunteer','1416 Queen St W Toronto','Help out at the co-op.','2016-10-14 17:00:26',0,NULL,NULL),('b5dbc9f0-a08a-11e6-b40b-713bf426156d','94fa8880-859f-11e6-a202-4106874124de','Volunteer English tutor','300 City Centre Drive, Mississauga, ON, L5B 2G6','Help a new resident of Canada learn English skills.','2016-11-01 23:27:09',0,43.58877160000001,-79.64439469999999),('b7c0f010-90a4-11e6-97ce-5dec9f3e43b3','94fa8880-859f-11e6-a202-4106874124de','Political campaigner','Mississauga','Knock on some doors! Get some people out to vote.','2016-10-12 17:53:01',0,NULL,NULL),('b8411c10-a088-11e6-8eb8-11b0b540cab7','94fa8880-859f-11e6-a202-4106874124de','Senior help','300 City Centre Drive, Mississauga, ON, L5B 2G6','Help a senior citizen by grocery shopping with them.','2016-11-01 23:12:54',0,43.58877160000001,-79.64439469999999),('bf644030-a08d-11e6-9f01-f7f2d111e43f','94fa8880-859f-11e6-a202-4106874124de','zxcv','300 City Centre Drive, Mississauga, ON, L5B 2G6','zxcv','2016-11-01 23:48:54',0,43.58877160000001,-79.64439469999999),('c6bf8bd0-931f-11e6-8d59-4b2ff21c0a19','69d00980-921c-11e6-a44a-f125eb084a6a','Another job posting','1416 Queen Street West, Toronto, ON, M6K 1L9','Check out this job posting!','2016-10-15 21:38:56',0,43.64112570000000,-79.43482560000000),('c70a2610-9232-11e6-a5b4-4f4ae47c68a4','69d00980-921c-11e6-a44a-f125eb084a6a','Sheridan Bike Co-op','Sheridan College, Oakville, ON L6H, Canada','We\'re setting up a Bike Co-op at Sheridan College.','2016-10-14 17:22:26',0,NULL,NULL),('d1aff3b0-8c15-11e6-ab46-c1c679f41a16','94fa8880-859f-11e6-a202-4106874124de','Volunteer firefighter','Throughout Mississauga','This baby\'s on fire! Must bring own bucket full of water.','2016-10-06 22:40:02',0,NULL,NULL),('e9137fb0-9235-11e6-bc8b-bf5afeac311b','94fa8880-859f-11e6-a202-4106874124de','Volunteer','300 City Centre Drive, Mississauga, ON, L5B 2G6','Volunteer','2016-10-14 17:44:52',0,43.58877160000001,-79.64439469999999),('f9877fc0-a119-11e6-b2f5-bd12b94782c3','69d00980-921c-11e6-a44a-f125eb084a6a','Bike volunteer','1416 Queen Street West, Toronto, ON, M6K 1L9','Help less fortunate individuals rebuild bicycles.','2016-11-02 16:32:41',0,43.64112570000000,-79.43482560000000);
/*!40000 ALTER TABLE `LdrPostings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrProfileTags`
--

DROP TABLE IF EXISTS `LdrProfileTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrProfileTags` (
  `ProfileID` varchar(36) NOT NULL,
  `TagID` int(11) NOT NULL,
  `Preference` int(11) DEFAULT '1000',
  PRIMARY KEY (`ProfileID`,`TagID`),
  KEY `TagID` (`TagID`),
  CONSTRAINT `LdrProfileTags_ibfk_1` FOREIGN KEY (`ProfileID`) REFERENCES `LdrProfiles` (`ProfileID`),
  CONSTRAINT `LdrProfileTags_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `LdrTags` (`TagID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrProfileTags`
--

LOCK TABLES `LdrProfileTags` WRITE;
/*!40000 ALTER TABLE `LdrProfileTags` DISABLE KEYS */;
INSERT INTO `LdrProfileTags` VALUES ('69d00980-921c-11e6-a44a-f125eb084a6a',1,990),('69d00980-921c-11e6-a44a-f125eb084a6a',2,990),('69d00980-921c-11e6-a44a-f125eb084a6a',3,990),('69d00980-921c-11e6-a44a-f125eb084a6a',4,990),('69d00980-921c-11e6-a44a-f125eb084a6a',5,990),('69d00980-921c-11e6-a44a-f125eb084a6a',6,990),('69d00980-921c-11e6-a44a-f125eb084a6a',7,990),('69d00980-921c-11e6-a44a-f125eb084a6a',8,990),('69d00980-921c-11e6-a44a-f125eb084a6a',9,990),('69d00980-921c-11e6-a44a-f125eb084a6a',10,990),('69d00980-921c-11e6-a44a-f125eb084a6a',11,990),('69d00980-921c-11e6-a44a-f125eb084a6a',12,990),('69d00980-921c-11e6-a44a-f125eb084a6a',13,990),('69d00980-921c-11e6-a44a-f125eb084a6a',14,990),('69d00980-921c-11e6-a44a-f125eb084a6a',15,990),('69d00980-921c-11e6-a44a-f125eb084a6a',16,990),('69d00980-921c-11e6-a44a-f125eb084a6a',17,990),('69d00980-921c-11e6-a44a-f125eb084a6a',18,990),('69d00980-921c-11e6-a44a-f125eb084a6a',19,990),('69d00980-921c-11e6-a44a-f125eb084a6a',20,990),('69d00980-921c-11e6-a44a-f125eb084a6a',21,990),('69d00980-921c-11e6-a44a-f125eb084a6a',22,990),('69d00980-921c-11e6-a44a-f125eb084a6a',23,990),('69d00980-921c-11e6-a44a-f125eb084a6a',24,990),('69d00980-921c-11e6-a44a-f125eb084a6a',25,990),('69d00980-921c-11e6-a44a-f125eb084a6a',26,992),('69d00980-921c-11e6-a44a-f125eb084a6a',27,995),('69d00980-921c-11e6-a44a-f125eb084a6a',28,997),('69d00980-921c-11e6-a44a-f125eb084a6a',29,997),('941cc820-859e-11e6-a202-4106874124de',1,984),('941cc820-859e-11e6-a202-4106874124de',2,984),('941cc820-859e-11e6-a202-4106874124de',3,1905),('941cc820-859e-11e6-a202-4106874124de',4,984),('941cc820-859e-11e6-a202-4106874124de',5,1901),('941cc820-859e-11e6-a202-4106874124de',6,1905),('941cc820-859e-11e6-a202-4106874124de',7,984),('941cc820-859e-11e6-a202-4106874124de',8,984),('941cc820-859e-11e6-a202-4106874124de',9,1905),('941cc820-859e-11e6-a202-4106874124de',10,984),('941cc820-859e-11e6-a202-4106874124de',11,1911),('941cc820-859e-11e6-a202-4106874124de',12,1905),('941cc820-859e-11e6-a202-4106874124de',13,984),('941cc820-859e-11e6-a202-4106874124de',14,1911),('941cc820-859e-11e6-a202-4106874124de',15,984),('941cc820-859e-11e6-a202-4106874124de',16,1901),('941cc820-859e-11e6-a202-4106874124de',17,2836),('941cc820-859e-11e6-a202-4106874124de',18,984),('941cc820-859e-11e6-a202-4106874124de',19,984),('941cc820-859e-11e6-a202-4106874124de',20,984),('941cc820-859e-11e6-a202-4106874124de',21,1901),('941cc820-859e-11e6-a202-4106874124de',22,1909),('941cc820-859e-11e6-a202-4106874124de',23,984),('941cc820-859e-11e6-a202-4106874124de',24,1901),('941cc820-859e-11e6-a202-4106874124de',25,1911),('941cc820-859e-11e6-a202-4106874124de',26,1909),('941cc820-859e-11e6-a202-4106874124de',27,1912),('941cc820-859e-11e6-a202-4106874124de',28,992),('941cc820-859e-11e6-a202-4106874124de',29,995),('a59f0d10-859e-11e6-a202-4106874124de',1,991),('a59f0d10-859e-11e6-a202-4106874124de',2,991),('a59f0d10-859e-11e6-a202-4106874124de',3,1918),('a59f0d10-859e-11e6-a202-4106874124de',4,991),('a59f0d10-859e-11e6-a202-4106874124de',5,1915),('a59f0d10-859e-11e6-a202-4106874124de',6,1918),('a59f0d10-859e-11e6-a202-4106874124de',7,991),('a59f0d10-859e-11e6-a202-4106874124de',8,991),('a59f0d10-859e-11e6-a202-4106874124de',9,1918),('a59f0d10-859e-11e6-a202-4106874124de',10,991),('a59f0d10-859e-11e6-a202-4106874124de',11,991),('a59f0d10-859e-11e6-a202-4106874124de',12,1918),('a59f0d10-859e-11e6-a202-4106874124de',13,991),('a59f0d10-859e-11e6-a202-4106874124de',14,991),('a59f0d10-859e-11e6-a202-4106874124de',15,991),('a59f0d10-859e-11e6-a202-4106874124de',16,1915),('a59f0d10-859e-11e6-a202-4106874124de',17,991),('a59f0d10-859e-11e6-a202-4106874124de',18,991),('a59f0d10-859e-11e6-a202-4106874124de',19,991),('a59f0d10-859e-11e6-a202-4106874124de',20,991),('a59f0d10-859e-11e6-a202-4106874124de',21,1915),('a59f0d10-859e-11e6-a202-4106874124de',22,991),('a59f0d10-859e-11e6-a202-4106874124de',23,991),('a59f0d10-859e-11e6-a202-4106874124de',24,1915),('a59f0d10-859e-11e6-a202-4106874124de',25,991),('a59f0d10-859e-11e6-a202-4106874124de',26,991),('a59f0d10-859e-11e6-a202-4106874124de',27,994),('a59f0d10-859e-11e6-a202-4106874124de',28,995),('a59f0d10-859e-11e6-a202-4106874124de',29,998);
/*!40000 ALTER TABLE `LdrProfileTags` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrProfiles`
--

LOCK TABLES `LdrProfiles` WRITE;
/*!40000 ALTER TABLE `LdrProfiles` DISABLE KEYS */;
INSERT INTO `LdrProfiles` VALUES ('08bfe3d0-88f4-11e6-b628-71f025d18246','foo@bar.com','$2a$10$qDRlZFhrTWQY/MtpK.khiuFANF153j5fZR5nMTXdn7a/TPZxEY2mi','','2016-10-02 23:00:38',0,NULL,NULL,0),('1e130fd0-90a8-11e6-a247-2baa0b9ef93d','asdf@asdf.com','$2a$10$zR.DAEVboVIWWaSBYF9dR.FBPC.tWaj2sYCpgLN5rJZOLyjrDe.M.','','2016-10-12 18:17:21',1,NULL,NULL,0),('2585a760-88f5-11e6-bcd7-edcee89fbed0','org@foobar.com','$2a$10$1GbrM.8/KWrzuxm2CTHv3unYhkkXC7u8ySOutqFd8xp42VOI9ecm.','','2016-10-02 23:08:35',1,NULL,NULL,0),('5e393600-8a60-11e6-9733-bf6dc532ffd7','newvol@laddr.xyz','$2a$10$V4rhxNCpwhgLZ.IPkWUpz.hADAJvlqyHYKOTGrfSKUOkvPMBG/NGO','img/uploads/generic.jpg','2016-10-04 18:28:38',0,NULL,NULL,0),('69d00980-921c-11e6-a44a-f125eb084a6a','bikepirates@gmail.com','$2a$10$Sns1eJhinZ.5fuWoIGCBJ.dbcW8uOUTzbsHMarn3VwA45bCmVZMXK','img/uploads/69d00980-921c-11e6-a44a-f125eb084a6a.jpg','2016-10-14 14:42:21',1,NULL,NULL,0),('941cc820-859e-11e6-a202-4106874124de','greg@laddr.xyz','$2a$10$/MxGWN2QS4SJignf9CcARe1M730mS/ZyVEs.3Y8w4lyiGTHQl1O1y','img/uploads/941cc820-859e-11e6-a202-4106874124de.jpg','2016-09-28 17:11:21',0,NULL,NULL,0),('94fa8880-859f-11e6-a202-4106874124de','volunteering@mississauga.ca','$2a$10$ixNZnHLBEkNIx/fgA3Szpud2EXMf46P76Mjk3iBN/qyIn4lJykuwG','img/uploads/94fa8880-859f-11e6-a202-4106874124de.jpg','2016-09-28 17:18:32',1,NULL,NULL,0),('a59f0d10-859e-11e6-a202-4106874124de','alan@laddr.xyz','$2a$10$nuDAVNgGZZltqP3iLB0OKenR3acMMEMniL0zDGrtpyYvMYuAF9EeS','img/uploads/generic.jpg','2016-09-28 17:11:51',0,NULL,NULL,0),('b4ab8c60-8996-11e6-97f4-c7317b673299','org@org.com','$2a$10$XGzQ.2cjiTuGXNwfrlMUU.apeGQv92GBBHrCADa.e2lZGpwfkQg3m','','2016-10-03 18:25:05',1,NULL,NULL,0),('b94829a0-859e-11e6-a202-4106874124de','muska@laddr.xyz','$2a$10$r1FlSz4O56CE/Pw3Z8j7s.1GWSTNle1Cg/UZgMFF21IgyzuXiSs52','img/uploads/generic.jpg','2016-09-28 17:12:24',0,NULL,NULL,0),('cf6b1fb0-8997-11e6-abf7-f1b4d73eb3ae','vol@vol.com','$2a$10$.k78VYXWmr9GhHmxuV6WAuQeUS/p8SkJ/mb8NA0eY7yDnpKvTDTfu','img/uploads/generic.jpg','2016-10-03 18:32:59',0,NULL,NULL,0),('d1ab72e0-859e-11e6-a202-4106874124de','peter@laddr.xyz','$2a$10$64rrY.eMzZJqFLMd6cbWxemwXuZLuNVsF15QKnl8rVbxdEF5FyO1y','img/uploads/generic.jpg','2016-09-28 17:13:05',0,NULL,NULL,0),('db832c80-859f-11e6-a202-4106874124de','volunteering@trilliumhealthpartners.ca','$2a$10$ab1XmchPyoEISAf3KjAG4uAIV8QWC7rD2qz97Lczv323S40qEllKO','img/uploads/db832c80-859f-11e6-a202-4106874124de.png','2016-09-28 17:20:31',1,NULL,NULL,0),('fbe6b480-89b7-11e6-a3f8-c3f1ab83fa78','greg@greg.com','$2a$10$fCJZDrR/wsuoP3R1f15hIeGWpgjp1M62L0a//AE3R.lInl7ZVqc.G','img/uploads/generic.jpg','2016-10-03 22:23:17',0,NULL,NULL,0);
/*!40000 ALTER TABLE `LdrProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LdrTags`
--

DROP TABLE IF EXISTS `LdrTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LdrTags` (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TagID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrTags`
--

LOCK TABLES `LdrTags` WRITE;
/*!40000 ALTER TABLE `LdrTags` DISABLE KEYS */;
INSERT INTO `LdrTags` VALUES (1,'Advocacy & Human Rights'),(2,'Animals'),(3,'Arts & Culture'),(4,'Children & Youth'),(5,'Community'),(6,'Computers & Technology'),(7,'Crisis Support'),(8,'Disaster Relief'),(9,'Education & Literacy'),(10,'Emergency & Safety'),(11,'Employment'),(12,'Environment'),(13,'Faith-based'),(14,'Health & Medicine'),(15,'Homeless & Housing'),(16,'Hunger'),(17,'Immigrants & Immigration'),(18,'International'),(19,'Justice & Legal'),(20,'LGBTQ'),(21,'Media & Broadcasting'),(22,'Mental Health'),(23,'People with Disabilities'),(24,'Politics'),(25,'Race & Ethnicity'),(26,'Seniors'),(27,'Sports & Recreation'),(28,'Veterans'),(29,'Women');
/*!40000 ALTER TABLE `LdrTags` ENABLE KEYS */;
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
INSERT INTO `LdrTopics` VALUES ('21800b40-85a0-11e6-a202-4106874124de','Welcome to the Laddr forums!','941cc820-859e-11e6-a202-4106874124de','2016-09-28 17:22:28',0),('1ebb5ab0-918d-11e6-bc1d-f35604a65aa3','asdf','941cc820-859e-11e6-a202-4106874124de','2016-10-13 21:36:37',0),('aa134fc0-85a1-11e6-a202-4106874124de','Stay tuned to Laddr for volunteering opportunities at Trillium Health Partners!','db832c80-859f-11e6-a202-4106874124de','2016-09-28 17:33:27',0);
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
INSERT INTO `LdrUsers` VALUES ('941cc820-859e-11e6-a202-4106874124de','Greg','Wood','Canadian college student studying software development. Check out my website!','resume',3),('a59f0d10-859e-11e6-a202-4106874124de','Alan','Simon','description','resume',1),('b94829a0-859e-11e6-a202-4106874124de','Muska','Ahmadzai','description','resume',1),('d1ab72e0-859e-11e6-a202-4106874124de','Peter','Phan','description','resume',1),('08bfe3d0-88f4-11e6-b628-71f025d18246','Foo','Bar','','',1),('cf6b1fb0-8997-11e6-abf7-f1b4d73eb3ae','First','Last','description','resume',1),('fbe6b480-89b7-11e6-a3f8-c3f1ab83fa78','greg','wood','description','resume',0),('5e393600-8a60-11e6-9733-bf6dc532ffd7','New','Volunteer','Description!','resume',4);
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
INSERT INTO `LdrApplications` VALUES ('5235c8b0-9234-11e6-b4ac-63d25d44356f','54cfad70-9234-11e6-b4ac-63d25d44356f',4,'2016-10-14 17:33:34');
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
INSERT INTO `LdrComments` VALUES ('534cb6f0-9234-11e6-b4ac-63d25d44356f','5235c8b0-9234-11e6-b4ac-63d25d44356f','2016-10-14 17:33:31','534c1ab0-9234-11e6-b4ac-63d25d44356f','This topic was creating during testing at Fri Oct 14 2016 13:33:31 GMT-0400 (EDT).',0),('5376fb40-9234-11e6-b4ac-63d25d44356f','5235c8b0-9234-11e6-b4ac-63d25d44356f','2016-10-14 17:33:31','53768610-9234-11e6-b4ac-63d25d44356f','This topic was creating during testing at Fri Oct 14 2016 13:33:31 GMT-0400 (EDT).',0),('53913a00-9234-11e6-b4ac-63d25d44356f','5235c8b0-9234-11e6-b4ac-63d25d44356f','2016-10-14 17:33:31','53768610-9234-11e6-b4ac-63d25d44356f','This is a comment added by the unit tests at Fri Oct 14 2016 13:33:31 GMT-0400 (EDT).',0);
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
  `Lat` double(16,14) DEFAULT NULL,
  `Lng` double(16,14) DEFAULT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrOrganizations`
--

LOCK TABLES `LdrOrganizations` WRITE;
/*!40000 ALTER TABLE `LdrOrganizations` DISABLE KEYS */;
INSERT INTO `LdrOrganizations` VALUES ('52c5d3b0-9234-11e6-b4ac-63d25d44356f','Organization Name','123 Fake Organization Way','Unit 4','Mississauga','Ontario','A1B2C3','www.fakeorg.com','To be the fakest organization.',43.65395600000000,-79.73993899900000),('52d2f310-9234-11e6-b4ac-63d25d44356f','Organization Name','123 Fake Organization Way','Unit 4','Mississauga','Ontario','A1B2C3','www.fakeorg.com','To be the fakest organization.',43.65395600000000,-79.73993899900000);
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
  `Lat` double(16,14) DEFAULT NULL,
  `Lng` double(16,14) DEFAULT NULL,
  PRIMARY KEY (`PostingID`),
  KEY `organizationID` (`ProfileID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrPostings`
--

LOCK TABLES `LdrPostings` WRITE;
/*!40000 ALTER TABLE `LdrPostings` DISABLE KEYS */;
INSERT INTO `LdrPostings` VALUES ('53c653c0-9234-11e6-b4ac-63d25d44356f','52c5d3b0-9234-11e6-b4ac-63d25d44356f','Test job title','Mississauga','A test job created in Mississauga','2016-10-14 17:33:32',1,43.65395600000000,-79.73993899900000),('54cfad70-9234-11e6-b4ac-63d25d44356f','52c5d3b0-9234-11e6-b4ac-63d25d44356f','Applicant','Brampton','Apply to this job!','2016-10-14 17:33:34',0,43.65395600000000,-79.73993899900000);
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
INSERT INTO `LdrProfiles` VALUES ('5235c8b0-9234-11e6-b4ac-63d25d44356f','dat@boi.com','$2a$10$dN5KVKvN0ewjSKPiMwtyDeYuGlsE64ylJHN1jmy8Civ44bTVDVlde','somepic.jpg','2016-10-14 17:33:29',0,NULL,NULL,0),('52490290-9234-11e6-b4ac-63d25d44356f','user_to_be_deleted@gmail.com','$2a$10$VybiEJSZd95DyhvAG9tDNOrgid.k1L1eYWKENOLApA24yguwXC0pO','somepic.jpg','2016-10-14 17:33:29',0,NULL,NULL,1),('52c5d3b0-9234-11e6-b4ac-63d25d44356f','codebusters@laddr.xyz','$2a$10$AsV.7.tILbdQX0LprCX38.GfI5dlu0oEZTQwRX356NkNqoKb.gmL6','somepic.jpg','2016-10-14 17:33:30',1,NULL,NULL,0),('52d2f310-9234-11e6-b4ac-63d25d44356f','to_be_deleted@gmail.com','$2a$10$JVULNvJrYyHW.4A0/iWak.j5qtkpD.6Zms3p2i9bdadsL.HVMMDqW','somepic.jpg','2016-10-14 17:33:30',1,NULL,NULL,1);
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
INSERT INTO `LdrTopics` VALUES ('534c1ab0-9234-11e6-b4ac-63d25d44356f','Topic created during testing','5235c8b0-9234-11e6-b4ac-63d25d44356f','2016-10-14 17:33:31',1),('53768610-9234-11e6-b4ac-63d25d44356f','Topic created during testing','5235c8b0-9234-11e6-b4ac-63d25d44356f','2016-10-14 17:33:31',0);
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
INSERT INTO `LdrUsers` VALUES ('5235c8b0-9234-11e6-b4ac-63d25d44356f','Test','User','Test Description','Test Resume',0),('52490290-9234-11e6-b4ac-63d25d44356f','Deleted','User','Test Description','Test Resume',0);
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

-- Dump completed on 2016-11-08 10:06:08
