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
INSERT INTO `LdrComments` VALUES ('1','Burritoless in Brampton','2016-03-13 15:09:17','1','Like the topic says, where can I get a good burrito in the city? Thanks in advance.',0),('2','Userguy123','2016-03-13 15:09:17','1','Try Burrito Boyz!',0),('3','Chuckie','2016-03-13 15:09:17','2','7!',0),('4','Mumma','2016-03-17 21:40:35','1','I\'d recommend Mumma\'s Burrito\'s.',NULL),('5','Mr. Robot','2016-03-17 21:41:48','1','Go to Chipotle, it\'s the best.',NULL),('6','A real woodchuck','2016-03-18 12:06:45','2','It\'s 10. Trust me, I\'m a real woodchuck.',NULL),('7','Greg','2016-03-20 14:01:15','3','This is another topic that I\'ve added to the forum through a PHP script.',NULL),('8','Foo','2016-03-20 15:20:40','4','Baz',NULL),('9','Foo','2016-03-20 15:24:23','5','Hey there world',NULL),('10','Greg','2016-03-20 15:41:12','4','foo',NULL),('11','Sloppy Joe','2016-03-20 16:06:33','6','Like the title says, I need to know what is good in the hood',NULL),('12','Greg','2016-03-20 16:11:47','7','Bar',NULL),('13','bleep','2016-03-20 16:13:17','8','Bloop',NULL),('14','beep','2016-03-20 16:16:47','9','Boop ',NULL),('15','bingo','2016-03-20 16:17:34','10','Bongo',NULL),('16','World','2016-03-20 16:44:58','5','Hey yourself',NULL),('17','123','2016-03-20 16:45:23','5','1234',NULL),('18','','2016-03-22 11:44:53','5','',NULL),('19','Greg','2016-03-22 11:45:10','5','Hello',NULL),('20','Greg','2016-04-11 22:37:19','5','A new comment!',NULL),('21','flimflam','2016-04-12 11:02:07','6','Like, what do you mean',NULL),('22','','2016-04-13 15:43:25','11','',NULL),('23','Greg','2016-04-13 15:44:12','11','Shhhhh......',NULL),('24','Greg','2016-04-13 15:44:39','12','You bet your tits it does',NULL),('25','','2016-04-13 16:07:01','13','',NULL),('26','','2016-04-14 13:14:07','14','',NULL),('27','Peetah','2016-04-18 23:20:46','15','When will we see the light of day?',NULL),('28','Greg','2016-04-19 10:14:23','15',':D I LOVE JAWAADS EXAMS',NULL),('5fba4590-3a70-11e6-93e8-75ff278eb015','greg','2016-06-24 21:01:39','5fb90d10-3a70-11e6-93e8-75ff278eb015','Every bit helps.',NULL),('8e01f560-3a70-11e6-93e8-75ff278eb015','frud','2016-06-24 21:02:57','5fb90d10-3a70-11e6-93e8-75ff278eb015','I couldn\'t agree more! They say that security requires constant vigilance, but the attacker only needs one vulnerability.',NULL),('12345','joe','2016-09-22 22:50:07','1','adsfadsfa',NULL),('f5192490-8119-11e6-a3f4-7107b73ecbe6','JOE','2016-09-22 23:11:56','1','foo',NULL),('5e1ea110-81b8-11e6-8941-35ef8db0d8c5','f987d410-3a72-11e6-a740-f5dd31d20d02','2016-09-23 18:05:53','5e0f37c0-81b8-11e6-8941-35ef8db0d8c5','Created to test the changes made to the API!',NULL),('a6caeb90-81bc-11e6-a162-b90f84eb8a78','f987d410-3a72-11e6-a740-f5dd31d20d02','2016-09-23 18:36:33','a6c82c70-81bc-11e6-a162-b90f84eb8a78','This one has even more exclamation marks!!!!!!!!!!!!!!!!!!!!',NULL);
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
  `Address` varchar(256) NOT NULL,
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
INSERT INTO `LdrOrganizations` VALUES ('2','City of Mississauga','300 City Center Drive, Mississauga ON','mississauga.ca','Mississauga will inspire the world as a dynamic and beautiful global city for creativity and innovation, with vibrant, safe and connected communities; where we celebrate the rich diversity of our cultures, our historic villages, Lake Ontario and the Credit River valley. A place where people choose to be.'),('3','Sheridan College','1430 Trafalgar Rd, Oakville, ON L6H 2L1','www.sheridancollege.ca','Campus bookstore chain offering new, used '),('6','Sample Organization','123 Test St.','','Test mission'),('6ed56070-3a6e-11e6-a853-1ba70c1a541c','New Organization','123 New Street','http://www.neworganization.com','To be the newest organization out there!');
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
INSERT INTO `LdrPostings` VALUES ('1','3','Student Union Representative','Trafalgar and Davis campuses','836a706ee9a609915a7139034765abb9c791424b','2016-04-13 13:11:44',NULL),('3','2','Marathon Volunteer','Various sites in Mississauga','Cheer on runners and provide water and Gatorade at one of the water stations along the marathon route.','2016-04-14 16:06:34',NULL),('4','3','Pysch study','Trafalgar','Volunteers needed for a psychology study. Just a focus group with multiple choice questions.','2016-04-14 16:26:47',NULL),('5','3','iOS Assistant','Sheridan College','Provide assistance in marking a LOT of exams.','2016-04-18 23:22:09',NULL),('6','3','iOS 2 Prof','Sheridan Traf','Trafalgar :D','2016-04-19 10:16:11',NULL),('14','2','A new job','Mississauga','Help out the community','2016-05-08 16:43:42',NULL),('4909aad0-3a6f-11e6-899d-c1efc2029d26',NULL,'Test Position','Brampton','Brampton','2016-06-24 20:53:52',NULL),('5763fbd0-3a6f-11e6-899d-c1efc2029d26',NULL,'Test Position','Brampton','Brampton','2016-06-24 20:54:16',NULL),('590d17f0-3a6f-11e6-899d-c1efc2029d26',NULL,'Test Position','Brampton','Brampton','2016-06-24 20:54:19',NULL);
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
  `PictureURL` varchar(1024) NOT NULL,
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
INSERT INTO `LdrProfiles` VALUES ('1','woodgre@sheridancollege.ca','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','','2016-05-16 21:33:19',0,NULL,NULL,0),('2','volunteering@mississauga.ca','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','mississauga.ca','2016-05-16 22:00:37',1,NULL,NULL,0),('3','volunteer@sheridancollege.ca','d8d00c7431376128cbc7276d02bc77b97919c37d','https://lh4.googleusercontent.com/-FC5-A2EQ7aw/VyeJ34UmokI/AAAAAAAAABo/D7EEMbd7FKglgdQ_hg1TAsPfgTmdKMSrgCLIB/s320-k-no/','2016-05-17 21:15:46',1,NULL,NULL,0),('4','johndoe@email.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','http://replygif.net/thumbnail/104.gif','2016-05-31 18:21:03',0,NULL,NULL,0),('ac000eb0-3a6d-11e6-b780-e3a1b2b24839','newguy@email.com','password','http://www.adweek.com/socialtimes/files/2012/03/twitter-egg-icon.jpg','2016-06-24 20:42:19',0,NULL,NULL,0),('6ed56070-3a6e-11e6-a853-1ba70c1a541c','neworg@email.com','password','http://www.adweek.com/socialtimes/files/2012/03/twitter-egg-icon.jpg','2016-06-24 20:47:46',1,NULL,NULL,0),('f987d410-3a72-11e6-a740-f5dd31d20d02','dat@boi.com','$2a$10$EGqMbSPs5F.WZmryYbi.1.p1.D6ReNehZsDHkHUpVkivZHGWPxfB.','https://pbs.twimg.com/profile_images/726464672400953344/4nX44_A7.jpg','2016-06-24 21:20:16',0,NULL,NULL,0),('5ff13fa0-8133-11e6-8a17-c52e0b768e69','',NULL,'','2016-09-23 02:13:53',0,'163293600',NULL,0);
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
INSERT INTO `LdrTopics` VALUES ('1','Where can I get a good burrito?','Burritoless in Brampton','2016-03-13 15:09:17',0),('2','How much wood would a woodchuck chuck if a woodchuck could chuck wood?','Woody','2016-03-13 15:09:17',0),('3','Another topic added to the forum.','Greg','2016-04-11 22:01:58',NULL),('6','What\'s good in the hood?','Sloppy Joe','2016-03-20 16:06:33',NULL),('15','These exams are killin me!','Peetah','2016-04-18 23:20:46',NULL),('5fb90d10-3a70-11e6-93e8-75ff278eb015','When it comes to security...','greg','2016-06-24 21:01:39',NULL),('5e0f37c0-81b8-11e6-8941-35ef8db0d8c5','This is a new topic.','f987d410-3a72-11e6-a740-f5dd31d20d02','2016-09-23 18:05:53',NULL),('a6c82c70-81bc-11e6-a162-b90f84eb8a78','Check it out, another new topic.','f987d410-3a72-11e6-a740-f5dd31d20d02','2016-09-23 18:36:33',NULL);
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
  `Description` varchar(2048) NOT NULL,
  `Resume` varchar(2048) NOT NULL,
  `AcademicStatus` int(11) NOT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrUsers`
--

LOCK TABLES `LdrUsers` WRITE;
/*!40000 ALTER TABLE `LdrUsers` DISABLE KEYS */;
INSERT INTO `LdrUsers` VALUES ('1','Greg','Wood','This is a test account. Hopefully it adds to both tables!','Pretty good at stuff.',1),('4','John','Doe','This is a test account.','Test resume.',1),('5','Jane','Doe','This is another test account','Test resume',1),('ac000eb0-3a6d-11e6-b780-e3a1b2b24839','New','Guy','Just a new guy!','High school educated',1),('f987d410-3a72-11e6-a740-f5dd31d20d02','Dat','Boi','Oh shit whaddup','It\'s dat boi! Skills: Unicycle riding',1);
/*!40000 ALTER TABLE `LdrUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `TestLadder`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `TestLadder` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `TestLadder`;

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
INSERT INTO `LdrComments` VALUES ('1897d8f0-83b6-11e6-87e3-1df2a80dcb27','17861ad0-83b6-11e6-87e3-1df2a80dcb27','2016-09-26 06:54:40','18978ad0-83b6-11e6-87e3-1df2a80dcb27','This topic was creating during testing at Mon Sep 26 2016 02:54:40 GMT-0400 (EDT).',0),('18c4dc60-83b6-11e6-87e3-1df2a80dcb27','17861ad0-83b6-11e6-87e3-1df2a80dcb27','2016-09-26 06:54:40','18c48e40-83b6-11e6-87e3-1df2a80dcb27','This topic was creating during testing at Mon Sep 26 2016 02:54:40 GMT-0400 (EDT).',0),('18e0a1c0-83b6-11e6-87e3-1df2a80dcb27','17861ad0-83b6-11e6-87e3-1df2a80dcb27','2016-09-26 06:54:40','18c48e40-83b6-11e6-87e3-1df2a80dcb27','This is a comment added by the unit tests at Mon Sep 26 2016 02:54:40 GMT-0400 (EDT).',0);
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
  `Address` varchar(256) NOT NULL,
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
INSERT INTO `LdrOrganizations` VALUES ('180f4800-83b6-11e6-87e3-1df2a80dcb27','Organization Name','123 Fake Organization Way','www.fakeorg.com','To be the fakest organization.'),('181c6760-83b6-11e6-87e3-1df2a80dcb27','Organization Name','123 Fake Organization Way','www.fakeorg.com','To be the fakest organization.');
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
INSERT INTO `LdrPostings` VALUES ('191609a0-83b6-11e6-87e3-1df2a80dcb27','180f4800-83b6-11e6-87e3-1df2a80dcb27','Test job title','Mississauga','A test job created in Mississauga','2016-09-26 06:54:40',1);
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
  `PictureURL` varchar(1024) NOT NULL,
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
INSERT INTO `LdrProfiles` VALUES ('17861ad0-83b6-11e6-87e3-1df2a80dcb27','dat@boi.com','$2a$10$fRO4oY0dnOyX8D7n3ZYtPeUyXgpg5HUusjbsF57Ckg4KEAQmvyck2','somepic.jpg','2016-09-26 06:54:38',0,NULL,NULL,0),('179c61f0-83b6-11e6-87e3-1df2a80dcb27','user_to_be_deleted@gmail.com','$2a$10$VG.Ea.QA1.rJYY4gYa8LI.9cdMi6mQbDxouiAB0p0kCYd0Z1forny','somepic.jpg','2016-09-26 06:54:38',0,NULL,NULL,1),('180f4800-83b6-11e6-87e3-1df2a80dcb27','codebusters@laddr.xyz','$2a$10$obY2avj9hwHWh3FwDv.fNecoAImr8WiQ2EC/t5ARiMDeQDdveiPRa','somepic.jpg','2016-09-26 06:54:39',1,NULL,NULL,0),('181c6760-83b6-11e6-87e3-1df2a80dcb27','to_be_deleted@gmail.com','$2a$10$0gBXLh6ISKcGBr7pNTLOFu2KtnkAvoGeAPHVssMf.6.yfQI.0UdEm','somepic.jpg','2016-09-26 06:54:39',1,NULL,NULL,1);
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
INSERT INTO `LdrTopics` VALUES ('18978ad0-83b6-11e6-87e3-1df2a80dcb27','Topic created during testing','17861ad0-83b6-11e6-87e3-1df2a80dcb27','2016-09-26 06:54:40',1),('18c48e40-83b6-11e6-87e3-1df2a80dcb27','Topic created during testing','17861ad0-83b6-11e6-87e3-1df2a80dcb27','2016-09-26 06:54:40',0);
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
  `Description` varchar(2048) NOT NULL,
  `Resume` varchar(2048) NOT NULL,
  `AcademicStatus` int(11) NOT NULL,
  KEY `ProfileID` (`ProfileID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LdrUsers`
--

LOCK TABLES `LdrUsers` WRITE;
/*!40000 ALTER TABLE `LdrUsers` DISABLE KEYS */;
INSERT INTO `LdrUsers` VALUES ('17861ad0-83b6-11e6-87e3-1df2a80dcb27','Test','User','Test Description','Test Resume',1),('179c61f0-83b6-11e6-87e3-1df2a80dcb27','Deleted','User','Test Description','Test Resume',1);
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

-- Dump completed on 2016-09-26  2:56:29
