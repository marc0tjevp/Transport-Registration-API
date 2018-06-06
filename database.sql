DROP DATABASE IF EXISTS `transport`;
CREATE DATABASE `transport`;
USE `transport`;

-- studentenhuis_user aanmaken
CREATE USER 'root'@'%' IDENTIFIED BY 'transport';
CREATE USER 'root'@'localhost' IDENTIFIED BY 'transport';

-- geef rechten aan deze user
GRANT SELECT, INSERT, DELETE, UPDATE ON `transport`.* TO 'studentenhuis_user'@'%';
GRANT SELECT, INSERT, DELETE, UPDATE ON `transport`.* TO 'studentenhuis_user'@'localhost';

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `imei` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table transport.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userID`, `username`, `password`, `imei`) VALUES
	(2, 'marc0tjevp', 'password', '352859085230361'),
	(15, 'bob', 'password', '352859085230361');
	
	
DROP TABLE IF EXISTS `driver`;
CREATE TABLE IF NOT EXISTS `driver` (
  `driverID` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(128) NOT NULL,
  PRIMARY KEY (`driverID`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;


INSERT INTO `driver` (`driverID`, `firstname`, `lastname`, `userID`) VALUES
	(1, 'Marco', 'van Poortvliet', 2),
	(17, 'bob', 'the builder', 15);

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `locationID` int(11) NOT NULL AUTO_INCREMENT,
  `long` decimal(128) NOT NULL,
  PRIMARY KEY (`driverID`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
	