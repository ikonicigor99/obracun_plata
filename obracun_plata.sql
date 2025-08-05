-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2025 at 04:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `obracun_plata`
--

-- --------------------------------------------------------

--
-- Table structure for table `radni_dani`
--

CREATE TABLE `radni_dani` (
  `id` int(11) NOT NULL,
  `zaposleni_id` int(11) NOT NULL,
  `datum` date NOT NULL COMMENT 'datum rada',
  `sati` decimal(4,2) NOT NULL COMMENT 'radni sati tog dana',
  `potvrdjeno` tinyint(4) NOT NULL COMMENT 'potvrdjeno od admina',
  `kreirano` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'automatski upis'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `radni_dani`
--

INSERT INTO `radni_dani` (`id`, `zaposleni_id`, `datum`, `sati`, `potvrdjeno`, `kreirano`) VALUES
(11, 6, '2025-06-08', 8.00, 0, '2025-06-09 17:25:08'),
(13, 2, '2025-06-09', 6.00, 0, '2025-06-09 18:12:22'),
(14, 3, '2025-06-09', 5.00, 0, '2025-06-09 18:12:50'),
(15, 1, '2025-06-10', 0.00, 0, '2025-06-09 18:13:14'),
(17, 5, '2025-06-12', 0.00, 0, '2025-06-09 18:13:34'),
(18, 5, '2025-06-10', 8.00, 0, '2025-06-11 16:38:23'),
(19, 6, '2025-06-10', 7.00, 0, '2025-06-11 17:30:18'),
(20, 5, '2025-06-11', 5.00, 0, '2025-06-18 19:49:36');

-- --------------------------------------------------------

--
-- Table structure for table `zaposleni`
--

CREATE TABLE `zaposleni` (
  `id` int(11) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `koeficijent` decimal(5,2) NOT NULL,
  `kreirano` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zaposleni`
--

INSERT INTO `zaposleni` (`id`, `ime`, `koeficijent`, `kreirano`) VALUES
(1, 'Zoran', 2.50, '2020-08-16 16:47:57'),
(2, 'Mladen', 1.90, '2020-08-25 16:47:57'),
(3, 'Slavisa', 2.90, '2019-05-21 05:30:00'),
(5, 'Igor', 10.00, '2025-06-04 16:43:49'),
(6, 'Bojana', 10.00, '2025-06-04 16:43:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `radni_dani`
--
ALTER TABLE `radni_dani`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zaposleni_id` (`zaposleni_id`);

--
-- Indexes for table `zaposleni`
--
ALTER TABLE `zaposleni`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `radni_dani`
--
ALTER TABLE `radni_dani`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `zaposleni`
--
ALTER TABLE `zaposleni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `radni_dani`
--
ALTER TABLE `radni_dani`
  ADD CONSTRAINT `radni_dani_ibfk_1` FOREIGN KEY (`zaposleni_id`) REFERENCES `zaposleni` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
