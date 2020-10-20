-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 20, 2020 lúc 07:41 PM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vieclamit`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `sdt` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `role`, `email`, `sdt`) VALUES
(1, 'admin', '123', 1, 'nguyenduynam12a10@gmail.com', 337470773),
(2, 'test', '456', 1, 'nguyenduyhuy10a14@gmail.com', 557476673),
(4, 'nam', '$2b$10$GKBSBmHQ.poMqAiN2H9kduUC78Xn0NoPmpsylZS4hKW13kpOhLaR6', 1, 'namgiang09202000@gmail.com', 123);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `apply`
--

CREATE TABLE `apply` (
  `apply_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `applyTime` datetime(6) NOT NULL,
  `status` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT 'loading'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `candidate`
--

CREATE TABLE `candidate` (
  `candidate_id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `gender` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `dob` date NOT NULL,
  `cv` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `applyPosition` int(11) NOT NULL,
  `applyAddress` int(11) NOT NULL,
  `img` varchar(1000) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `company_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `firstAddress` text COLLATE utf8_bin DEFAULT NULL,
  `province_id` int(11) NOT NULL,
  `company_avatar` varchar(600) COLLATE utf8_bin NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `reason` text COLLATE utf8_bin NOT NULL,
  `treatment` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job`
--

CREATE TABLE `job` (
  `job_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `job_title` varchar(255) COLLATE utf8_bin NOT NULL,
  `min_salary` int(255) DEFAULT NULL,
  `max_salary` int(255) DEFAULT NULL,
  `job_description` text COLLATE utf8_bin NOT NULL,
  `require` text COLLATE utf8_bin NOT NULL,
  `overtime` tinyint(1) NOT NULL,
  `update_time` datetime NOT NULL,
  `timeserving` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_position`
--

CREATE TABLE `job_position` (
  `position_id` int(11) NOT NULL,
  `position_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `province`
--

CREATE TABLE `province` (
  `province_id` int(11) NOT NULL,
  `province_name` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `content` text COLLATE utf8_bin DEFAULT NULL,
  `encourage` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `techcandidate`
--

CREATE TABLE `techcandidate` (
  `techCandidate_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `techcompany`
--

CREATE TABLE `techcompany` (
  `techCompany_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `techjob`
--

CREATE TABLE `techjob` (
  `techjob_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `technology`
--

CREATE TABLE `technology` (
  `technology_id` int(11) NOT NULL,
  `technology_name` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `apply`
--
ALTER TABLE `apply`
  ADD PRIMARY KEY (`apply_id`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `job_id` (`job_id`);

--
-- Chỉ mục cho bảng `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`candidate_id`),
  ADD KEY `accountId` (`accountId`),
  ADD KEY `applyPosition` (`applyPosition`),
  ADD KEY `applyAddress` (`applyAddress`);

--
-- Chỉ mục cho bảng `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Chỉ mục cho bảng `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `position_id` (`position_id`);

--
-- Chỉ mục cho bảng `job_position`
--
ALTER TABLE `job_position`
  ADD PRIMARY KEY (`position_id`);

--
-- Chỉ mục cho bảng `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`province_id`);

--
-- Chỉ mục cho bảng `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Chỉ mục cho bảng `techcandidate`
--
ALTER TABLE `techcandidate`
  ADD PRIMARY KEY (`techCandidate_id`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `technology_id` (`technology_id`);

--
-- Chỉ mục cho bảng `techcompany`
--
ALTER TABLE `techcompany`
  ADD PRIMARY KEY (`techCompany_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `technology_id` (`technology_id`);

--
-- Chỉ mục cho bảng `techjob`
--
ALTER TABLE `techjob`
  ADD PRIMARY KEY (`techjob_id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `technology_id` (`technology_id`);

--
-- Chỉ mục cho bảng `technology`
--
ALTER TABLE `technology`
  ADD PRIMARY KEY (`technology_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `apply`
--
ALTER TABLE `apply`
  MODIFY `apply_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `candidate`
--
ALTER TABLE `candidate`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `job`
--
ALTER TABLE `job`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `job_position`
--
ALTER TABLE `job_position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `techcandidate`
--
ALTER TABLE `techcandidate`
  MODIFY `techCandidate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `techcompany`
--
ALTER TABLE `techcompany`
  MODIFY `techCompany_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `techjob`
--
ALTER TABLE `techjob`
  MODIFY `techjob_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `technology`
--
ALTER TABLE `technology`
  MODIFY `technology_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `apply`
--
ALTER TABLE `apply`
  ADD CONSTRAINT `apply_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`),
  ADD CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`);

--
-- Các ràng buộc cho bảng `candidate`
--
ALTER TABLE `candidate`
  ADD CONSTRAINT `candidate_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `candidate_ibfk_2` FOREIGN KEY (`applyPosition`) REFERENCES `job_position` (`position_id`),
  ADD CONSTRAINT `candidate_ibfk_3` FOREIGN KEY (`applyAddress`) REFERENCES `province` (`province_id`);

--
-- Các ràng buộc cho bảng `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `company_ibfk_2` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`);

--
-- Các ràng buộc cho bảng `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  ADD CONSTRAINT `job_ibfk_2` FOREIGN KEY (`position_id`) REFERENCES `job_position` (`position_id`);

--
-- Các ràng buộc cho bảng `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Các ràng buộc cho bảng `techcandidate`
--
ALTER TABLE `techcandidate`
  ADD CONSTRAINT `techcandidate_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`),
  ADD CONSTRAINT `techcandidate_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`technology_id`);

--
-- Các ràng buộc cho bảng `techcompany`
--
ALTER TABLE `techcompany`
  ADD CONSTRAINT `techcompany_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  ADD CONSTRAINT `techcompany_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`technology_id`);

--
-- Các ràng buộc cho bảng `techjob`
--
ALTER TABLE `techjob`
  ADD CONSTRAINT `techjob_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`),
  ADD CONSTRAINT `techjob_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`technology_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
