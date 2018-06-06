-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.29-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for transport
DROP DATABASE IF EXISTS `transport`;
CREATE DATABASE IF NOT EXISTS `transport` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `transport`;

-- Dumping structure for table transport.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `imei` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

-- Dumping data for table transport.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userID`, `username`, `password`, `imei`) VALUES
	(29, 'djimmeke', 'hallo?', '429587235'),
	(31, 'marc0tjevp', 'hfh', 'hfh');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

-- Dumping structure for table transport.driver
DROP TABLE IF EXISTS `driver`;
CREATE TABLE IF NOT EXISTS `driver` (
  `driverID` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`driverID`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

-- Dumping data for table transport.driver: ~2 rows (approximately)
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` (`driverID`, `firstname`, `lastname`, `userID`) VALUES
	(31, 'Djim', 'Oomes', 29),
	(33, 'Marco', 'van Poortvliet', 31);
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;

-- Dumping structure for table transport.cargo_user
DROP TABLE IF EXISTS `cargo_user`;
CREATE TABLE IF NOT EXISTS `cargo_user` (
  `cargoID` int(11) NOT NULL AUTO_INCREMENT,
  `mrn` varchar(128) NOT NULL,
  `driverID` int(11) NOT NULL,
  PRIMARY KEY (`cargoID`),
  CONSTRAINT `FK_cargo_user_driver` FOREIGN KEY (`driverID`) REFERENCES `driver` (`driverID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table transport.cargo_user: ~1 rows (approximately)
/*!40000 ALTER TABLE `cargo_user` DISABLE KEYS */;
INSERT INTO `cargo_user` (`cargoID`, `mrn`, `driverID`) VALUES
	(16, '18IT123457384910TF', 31);
/*!40000 ALTER TABLE `cargo_user` ENABLE KEYS */;

DROP TABLE IF EXISTS `drive_times`;
CREATE TABLE IF NOT EXISTS `drive_times`(
  `startTime` varchar(128) NOT NULL,
  `endTime` varchar(128) NOT NULL,
  `travelTime` varchar(128) NOT NULL,
  `mrn` varchar(128) NOT NULL,
  `driverID` int(11) NOT NULL,
  CONSTRAINT `FK_drive_times` FOREIGN KEY (`driverID`) REFERENCES `driver` (`driverID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `drive_times` (`startTime`,`endTime`, `travelTime`,`mrn`,`driverID`) VALUES
  ('12:00', '18:00','03:45:09' ,'19NL92929212', 33);