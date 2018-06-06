DROP DATABASE IF EXISTS `mockdatabase`;
CREATE DATABASE `mockdatabase`;
USE `mockdatabase`;

-- studentenhuis_user aanmaken
CREATE USER 'mock'@'%' IDENTIFIED BY 'secret';
CREATE USER 'mock'@'localhost' IDENTIFIED BY 'secret';

-- geef rechten aan deze user
GRANT SELECT, INSERT, DELETE, UPDATE ON `mockdatabase`.* TO 'mock'@'%';
GRANT SELECT, INSERT, DELETE, UPDATE ON `mockdatabase`.* TO 'mock'@'localhost';

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------


--
-- Tabelstructuur voor tabel `apikey`
--
DROP TABLE IF EXISTS `apiKey`;
CREATE TABLE `apiKey` (
  `apiKey` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `apikey`
--

INSERT INTO `apiKey` (`apiKey`) VALUES
('e5d36f431b785ddc8b402981dcbef76c8444cc31170f28088c14cff1c8df6d88');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `declaration`
--
DROP TABLE IF EXISTS `declaration`;
CREATE TABLE `declaration` (
  `mrn` varchar(18) NOT NULL,
  `declarationStatus` int(11) NOT NULL DEFAULT '0',
  `reference` varchar(100) CHARACTER SET utf8 NOT NULL,
  `dateTime` datetime NOT NULL,
  `sender` varchar(100) CHARACTER SET utf8 NOT NULL,
  `receiver` varchar(100) CHARACTER SET utf8 NOT NULL,
  `client` varchar(50) CHARACTER SET utf8 NOT NULL,
  `articleAmount` int(11) NOT NULL,
  `totalAmount` decimal(30,3) NOT NULL,
  `currency` varchar(15) CHARACTER SET utf8 NOT NULL,
  `totalWeight` decimal(30,3) NOT NULL,
  `addressOrigin` varchar(100) NOT NULL,
  `addressDestination` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `declaration`
--

INSERT INTO `declaration` (`mrn`, `declarationStatus`, `reference`, `dateTime`, `sender`, `receiver`, `client`, `articleAmount`, `totalAmount`, `currency`, `totalWeight`, `address`, `addressDestination`) VALUES
('18IT123457384910TF', 0, 'Reference', '2018-05-31 00:00:00', 'Bart Klomp', 'Fred Verstegen', 'Henk van Hoof', 6, '6060.000', 'EUR', '100.500', 'hogeschoollaan 3', 'lovensdijkstraat 14');
COMMIT;