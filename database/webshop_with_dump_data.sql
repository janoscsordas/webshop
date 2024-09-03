-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2024 at 07:18 PM
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
-- Database: `webshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminusers`
--

CREATE TABLE `adminusers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adminusers`
--

INSERT INTO `adminusers` (`id`, `email`, `password`) VALUES
(1, 'adminteszt@jani.hu', '$argon2id$v=19$m=65536,t=2,p=1$3cwuf/AId0Wj02EzIkgJMyBlAl/BrjTC9BkEubuA5qY$m6m13KhcnaTln/O/xT7RF+xLhKR89F8bozjYmCy4SAc'),
(2, 'admin@admin.hu', '$argon2id$v=19$m=65536,t=2,p=1$+LS7fhQXlNxg6fvk6vi6/PazE/ZzX4Er4kh9SLR6YmI$Z9HGZqmaHEhVylCwGZ1bT3mFTl8Mwtv3ZyHuVzmrFQQ');

-- --------------------------------------------------------

--
-- Table structure for table `approved_orders`
--

CREATE TABLE `approved_orders` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `orderDate` date DEFAULT NULL,
  `approvedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `approved_orders`
--

INSERT INTO `approved_orders` (`id`, `customerId`, `product`, `price`, `orderDate`, `approvedDate`) VALUES
(4, 9, 'iPhone 14 Pro Max', 850, '2023-03-02', '2024-08-02'),
(6, 9, 'iPhone 14 Pro Max', 850, '2023-03-02', '2024-08-26');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `categoryName`) VALUES
(1, 'Mobile'),
(2, 'Tablet'),
(3, 'Laptop'),
(4, 'PC'),
(5, 'Monitor');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`) VALUES
(9, 'janocsordas@gmail.com', '$argon2id$v=19$m=65536,t=2,p=1$VDefonLEGP5Q0omWe2vHorlyE0lgVO1cJHX99YVNolM$Zwvxccu20F2S5CnX4lkvGdIclBm/yNgj5fWrElo3nDs'),
(10, 'admin@admin.hu', '$argon2id$v=19$m=65536,t=2,p=1$T88fB07yYsfKWiOlCCsI3j7jnL5rw53AHFeMgPnkXbI$FzXVfh+v7vsRzGoRIdXr9Z+sbj7pVvXPGdz2p/VngKE'),
(11, 'admin@janiadmin.hu', '$argon2id$v=19$m=65536,t=2,p=1$DR8Ivd4qqBIEoaTJdLh3LXsR2nrGqdu5+0bMRMqXs/E$T3ZzhyzlXNJcFr2SsC6L74jk1rbr7428lPiBnlhoZhg');

-- --------------------------------------------------------

--
-- Table structure for table `groupmessages`
--

CREATE TABLE `groupmessages` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `sentDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `groupmessages`
--

INSERT INTO `groupmessages` (`id`, `user`, `message`, `sentDate`) VALUES
(44, 'admin@admin.hu', 'U2FsdGVkX1+u2k95G+SLI20F+oVfmePKrrRO3Wxxdc4=', '2024-08-19 07:01:12'),
(45, 'admin@admin.hu', 'U2FsdGVkX18CtDN3+Yaeotg8qKra1TGYBHpSZEcnAtk=', '2024-08-20 12:32:51');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `orderDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerId`, `product`, `price`, `orderDate`) VALUES
(9, 9, 'iPhone 14 Pro Max', 850, '2023-03-02'),
(13, 10, 'Redmagic 5 Pro', 350, '2024-08-27'),
(14, 10, 'Xiaomi Redmi Note 10 Pro', 300, '2024-08-27'),
(15, 10, 'Sony Xperia M4 Aqua', 100, '2024-08-27'),
(16, 10, 'Xiaomi Redmi Note 13 Pro', 450, '2024-08-27'),
(17, 10, 'iPhone 15 Pro Max', 1359, '2024-08-27');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `inStock` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categoryId`, `productName`, `productPrice`, `createdAt`, `inStock`) VALUES
(12, 1, 'Samsung Galaxy S24 Ultra', 1289, '2024-01-15', 0),
(13, 1, 'Samsung Galaxy S23 Ultra', 999, '2023-02-03', 1),
(14, 1, 'iPhone 15 Pro Max', 1359, '2023-09-30', 1),
(17, 1, 'Xiaomi Redmi Note 13 Pro', 450, '2021-05-11', 0),
(18, 1, 'Xiaomi Redmi Note 10 Pro', 300, '2019-05-11', 1),
(19, 1, 'Sony Xperia M4 Aqua', 100, '2024-06-28', 0),
(20, 1, 'Redmagic 5 Pro', 350, '2024-06-28', 1),
(21, 5, 'Acer EK221QB', 95, '2024-06-28', 1),
(22, 4, 'Nvidia GeForce GTX 1660 Ti', 450, '2024-06-28', 1),
(23, 2, 'Samsung Galaxy Tab S6', 859, '2024-06-28', 1),
(45, 1, 'iPhone 14 Pro Max', 790, '2024-08-02', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminusers`
--
ALTER TABLE `adminusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `approved_orders`
--
ALTER TABLE `approved_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupmessages`
--
ALTER TABLE `groupmessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminusers`
--
ALTER TABLE `adminusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `approved_orders`
--
ALTER TABLE `approved_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `groupmessages`
--
ALTER TABLE `groupmessages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
