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
CREATE DATABASE IF NOT EXISTS `transport` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `transport`;

-- Dumping structure for table transport.driver
CREATE TABLE IF NOT EXISTS `driver` (
  `driverID` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  PRIMARY KEY (`driverID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table transport.driver: ~0 rows (approximately)
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` (`driverID`, `firstname`, `lastname`) VALUES
	(1, 'Marco', 'van Poortvliet'),
	(2, 'Djim', 'Oomes');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;

-- Dumping structure for table transport.user
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `driverID` int(11) NOT NULL,
  `imei` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `FKdriver_user` (`driverID`),
  CONSTRAINT `FKdriver_user` FOREIGN KEY (`driverID`) REFERENCES `driver` (`driverID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table transport.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userID`, `username`, `password`, `driverID`, `imei`) VALUES
	(1, 'djim', 'password', 2, '351859081530390'),
	(4, 'marco', 'password', 1, '352859085230361');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
