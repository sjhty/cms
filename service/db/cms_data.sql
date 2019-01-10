-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-01-10 15:01:53
-- 服务器版本： 5.7.17-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms_data`
--

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `size` varchar(200) NOT NULL,
  `imgUrl` varchar(300) DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `supplier` varchar(200) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `title`, `size`, `imgUrl`, `price`, `stock`, `supplier`, `createTime`, `modifyTime`) VALUES
(100002, '艾诗塔樱桃裤', 'A款 M', NULL, 198, 5, '艾诗塔', '2019-01-10 22:45:36', '2019-01-10 22:45:36'),
(100003, '艾诗塔樱桃裤', 'A款 L', NULL, 198, 10, '艾诗塔', '2019-01-10 22:46:28', '2019-01-10 22:46:28'),
(100004, '艾诗塔樱桃裤', 'A款 XL', NULL, 198, 12, '艾诗塔', '2019-01-10 22:47:04', '2019-01-10 22:47:04'),
(100005, '艾诗塔樱桃裤', 'B款 M', NULL, 198, 11, '艾诗塔', '2019-01-10 22:47:43', '2019-01-10 22:47:43'),
(100006, '艾诗塔樱桃裤', 'B款 L', NULL, 198, 16, '艾诗塔', '2019-01-10 22:48:06', '2019-01-10 22:48:06'),
(100007, '艾诗塔樱桃裤', 'B款 XL', NULL, 198, 18, '艾诗塔', '2019-01-10 22:48:46', '2019-01-10 22:48:46'),
(100008, '艾诗塔樱桃裤PLUS', 'A款 L', NULL, 188, 20, '艾诗塔', '2019-01-10 22:49:46', '2019-01-10 22:49:46'),
(100009, '艾诗塔樱桃裤PLUS', 'A款 XL', NULL, 188, 10, '艾诗塔', '2019-01-10 22:50:20', '2019-01-10 22:50:20'),
(100010, '艾诗塔樱桃裤PLUS', 'B款 L', NULL, 188, 7, '艾诗塔', '2019-01-10 22:51:05', '2019-01-10 22:51:05'),
(100011, '艾诗塔樱桃裤PLUS', 'B款 XL', NULL, 188, 24, '艾诗塔', '2019-01-10 22:51:35', '2019-01-10 22:51:35'),
(100012, '艾诗塔坚果裤', 'A款 XL', NULL, 208, 9, '艾诗塔', '2019-01-10 22:52:25', '2019-01-10 22:52:25'),
(100013, '艾诗塔坚果裤', 'A款 XXL', 'null', 208, 15, '艾诗塔', '2019-01-10 22:52:53', '2019-01-10 22:52:53'),
(100014, '艾诗塔坚果裤', 'B款 XL', NULL, 208, 27, '艾诗塔', '2019-01-10 22:53:22', '2019-01-10 22:53:22'),
(100015, '艾诗塔坚果裤', 'B款 XXL', NULL, 208, 17, '艾诗塔', '2019-01-10 22:54:15', '2019-01-10 22:54:15');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nickname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `nickname`) VALUES
(1, '1111', '1111', '111111');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100016;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
