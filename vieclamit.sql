-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 11, 2020 lúc 01:29 PM
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
(4, 'nam', '$2b$10$GKBSBmHQ.poMqAiN2H9kduUC78Xn0NoPmpsylZS4hKW13kpOhLaR6', 1, 'namgiang09202000@gmail.com', 123),
(5, 'duynam0902', '$2b$10$UxVbLP3f.45KKLLS3UtzT.onFio7jlXgf2qsmodztOdGxPJX8DqmW', 2, 'nguyenduynam12a10@gmail.com', 12424),
(6, 'namduy', '$2b$10$OnFWQvcUH4uk3MTXseI7ke2/J/Hr3vjdAAV1vdLi/FZH9904bdSf.', 1, '18020930@vnu.edu.vn', 12344),
(7, 'asd', '$2b$10$p3yvmM6J/PotV69rW6DvuuoCXW5UxfDx6y9PwX0lXUGiNVd5w8pMq', 1, '', 0),
(8, 'eqdadad', '$2b$10$XuJCdxIIEdJTZrTkzPE2jOljtZhnOz1EMhEmfojh8BGvzhv28SoWi', 2, '', 0),
(9, 'namnguyen', '$2b$10$Esf2sE0qnqKyIZUePuMNj.TEOqFe/i9BF1rF7Yljgn5akuBaFgQ26', 1, 'namgiang09202000@gmail.com', 12424),
(10, 'GrabVietNam', '$2b$10$DmI6O1dcTfQoYykQhVnvMuw3GGrrYeJBssWvo4eI3IGghNBWGl3bC', 2, '', 0),
(11, 'minhcuong', '$2b$10$/M6g.9Z9QF.nZeXo.gotau1x0mqph51S9WRARWWZ7JSbP29sqM4NO', 1, 'nguyenduynam12a10@gmail.com', 0),
(12, ' NFQAsia', '$2b$10$NxHOiAGccAbuWKtqfqCac.8xzYckZD/pmbaMA4jUlqdUwzbd994Fm', 2, '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `apply`
--

CREATE TABLE `apply` (
  `apply_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `applyTime` datetime(6) NOT NULL,
  `receivedTime` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `apply`
--

INSERT INTO `apply` (`apply_id`, `candidate_id`, `job_id`, `applyTime`, `receivedTime`) VALUES
(9, 2, 19, '2020-11-09 21:11:59.000000', NULL),
(10, 2, 20, '2020-11-09 21:12:10.000000', '2020-11-09 21:13:11.000000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `candidate`
--

CREATE TABLE `candidate` (
  `candidate_id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `gender` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `cv` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `img` varchar(1000) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `candidate`
--

INSERT INTO `candidate` (`candidate_id`, `accountId`, `name`, `gender`, `dob`, `cv`, `img`) VALUES
(2, 4, 'Nguyen Duy Nam', '1', '2000-02-09', 'http://res.cloudinary.com/dsysolkex/image/upload/v1605093083/vkpkqthc1dpe5dlob7ox.pdf', 'https://res.cloudinary.com/dsysolkex/image/upload/v1603700652/sample.jpg'),
(7, 7, 'aaa', NULL, NULL, NULL, NULL),
(8, 9, 'Nguyen Duy Nam', NULL, NULL, NULL, NULL),
(9, 11, 'Dong Minh Cuong', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `company_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `firstAddress` text COLLATE utf8_bin DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  `company_avatar` varchar(600) COLLATE utf8_bin DEFAULT NULL,
  `cover_image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin DEFAULT NULL,
  `reason` text COLLATE utf8_bin DEFAULT NULL,
  `treatment` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `company`
--

INSERT INTO `company` (`company_id`, `account_id`, `company_name`, `firstAddress`, `province_id`, `company_avatar`, `cover_image`, `description`, `reason`, `treatment`) VALUES
(1, 5, 'BOCASAY', '161A - Phan Dang Luu            ', 1, 'http://res.cloudinary.com/dsysolkex/image/upload/v1604987758/ujyvyluog2trruicmet1.png', 'http://res.cloudinary.com/dsysolkex/image/upload/v1604987759/mtpkq7dwtm2rrztsyr5o.jpg', 'BOCASAY Group is driven by a strong entrepreneurial spirit and the desire to create a link between people and their environment, we associate humanism with a results-based culture.\r\n\r\nThanks to its independent shareholding stability, the group has been conducting a long-term innovative IT-producing strategy for the past 7 years.\r\n\r\nOperating in 3 countries with 160 employees globally (France, Vietnam, Madagascar), BOCASAY Group is now holding strong positions in developing Agile IT solutions\r\n\r\nBOCASAY VIETNAM is a BOCASAY Group company, deliver and implement IT solutions for software publisher and integrator in Fintech, Medical, Insurance, Media and Startup business line.\r\n\r\nWorking with BOCASAY you’ll have the opportunities to develop your skills and career in an exciting work-place in touch with an international and innovative environment.            ', 'Project and working atmosphere\r\nWork-life balance\r\nMany salary supplements and benefits are available            ', 'Competitive salary\r\nFlexible working environment\r\nEncourage people to be lead & push new ideas forward in our small teams\r\nSocial/Health/Unemployment Insurances are fully levied on the salary\r\n15 days of annual leave\r\n13th salary is paid before the Lunar New Year\r\nPVI Healthcare Insurance\r\nLoyalty bonus (10-year scheme)\r\nTraining & study sponsorship\r\nTons of fun & exciting team activities: annual company trip, monthly BBQ night, happy hours, etc.\r\nAnd much more...!            '),
(6, 8, 'Choi Game', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 10, 'Grab (Vietnam) Ltd.', ' Mapletree Business Centre, District 7  ', 2, 'http://res.cloudinary.com/dsysolkex/image/upload/v1604891375/gvmeviyfdzeiwb3xhrwn.png', 'http://res.cloudinary.com/dsysolkex/image/upload/v1604891375/baufpsoyqcrftawpg4lc.jpg', 'Grab is Southeast Asia’s leading everyday everything app – providing transportation, logistics and financial services to millions of users across the region. Powered by heart and driven by technology, we aim to unlock the true potential of the region by solving the problems that hinder progress for our communities. If you share our vision of Driving Southeast Asia Forward, apply to join our team today.\r\n\r\nGrab Vietnam R&D Lab:\r\n\r\nWe focus on building and nurturing the best engineering talents from diverse academic backgrounds and industry experiences to strategize and execute high profile projects through data-driven\'s methodologies.  ', 'State-of-the-art technologies\r\nCollaboration with top coders\r\nMegascale user-facing problems', ' We care a great deal about code quality. We often go back and improve core parts of the codebase to make it better or more lean. We can do this because of great test coverage which will immediately sound the alarm when something goes wrong.\r\n\r\nWe ship on quality instead of on time. When a feature is ready we deploy it immediately to everyone or use an internal system to roll it out to a certain percentage of customers. Various teams deploy new code many times throughout the day.\r\n\r\nWhat will you have at Grab (Vietnam):\r\n\r\n1. Positive & Collaborative environment\r\n\r\nGrabbers thrive in a corporate culture that values every team member contribution towards our goal of improving lives.\r\n\r\n2. Rocket fuel for careers\r\n\r\nGrabbers experience hyper professional growth and all the challenges that entails. Grow your skills while working to solve real issues across the region.\r\n\r\n3. Fun & dedicated family\r\n\r\nGrabbers work hard and play hard. Our teams grow as one as they overcome challenges and have fun along the way.  \r\nMacbook is provided.\r\nExtra Medical Insurance.\r\n14 days annual leaves, working Monday - Friday.\r\nFree drive with Grab (budget follow your level)\r\nGrab is Southeast Asia’s leading everyday everything app – providing transportation, logistics and financial services to millions of users across the region. Powered by heart and driven by technology, we aim to unlock the true potential of the region by solving the problems that hinder progress for our communities. If you share our vision of Driving Southeast Asia Forward, apply to join our team today.  '),
(8, 12, 'NFQ Asia (8bit Rockstars)', ' 54 Lam Hoanh Son Tra ', 3, 'http://res.cloudinary.com/dsysolkex/image/upload/v1605088608/vfvrehnlvhvfydlzkyia.png', 'http://res.cloudinary.com/dsysolkex/image/upload/v1605088609/wqsfexxx4csslqxwp8vx.jpg', 'NFQ Asia is part of the global NFQ Group. We help ambitious fast-moving international startups\r\nAs a part of the global NFQ Group with 20+ years of experience scaling companies and a team of 500++ developers, NFQ Vietnam focuses on building high-performance dedicated teams for ambitious tech-driven businesses in Europe and Asia.\r\nEach team here works directly with the client from end to end in an Agile spirit. This unique set up gives our employees the experience of working for a real product company, with a real sense of commitment and ownership to the product itself.\r\nNFQ Vietnam has more than 200 engineers located in HoChiMinh and Danang offices. We are recognized as top-notch place to work in Vietnam. JOIN US!\r\nOur page: www.nfq.asia\r\nOur Facebook: https://www.facebook.com/nfq.asia/', 'We truly value your thoughts and opinions\r\nGlobal and professional\r\nHonest, Transparent, Open-minded, Respect, Empathy', ' Laptop is provided.\r\nA fun & dynamic environment and freedom to be creative.\r\nRock in open-mind, kind & humble band.\r\nModern office with the flexible relaxing zone.\r\nCompany trip, team building & other community Tech activities.\r\nYear-end bonus.\r\nPerformance review  2 times/ year.\r\nExtra Medical Insurance.\r\n15 days annual leaves, working Monday – Friday.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job`
--

CREATE TABLE `job` (
  `job_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `job_title` varchar(255) COLLATE utf8_bin NOT NULL,
  `number_of_job` int(4) NOT NULL,
  `min_salary` int(255) DEFAULT NULL,
  `max_salary` int(255) DEFAULT NULL,
  `job_description` text COLLATE utf8_bin NOT NULL,
  `job_require` text COLLATE utf8_bin NOT NULL,
  `overtime` tinyint(1) NOT NULL,
  `update_time` datetime NOT NULL,
  `timeserving` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `job`
--

INSERT INTO `job` (`job_id`, `company_id`, `position_id`, `job_title`, `number_of_job`, `min_salary`, `max_salary`, `job_description`, `job_require`, `overtime`, `update_time`, `timeserving`) VALUES
(2, 1, 4, 'Senior/Manager PHP Developer', 1, 1000, 0, 'Read and understand technical specifications, analyze product requirements, design features.\r\nDevelop and maintain software systems & web applications.\r\nResponsible for troubleshooting application related issues and insuring/maintaining high performance a', 'Strong Computer Science (CS) fundamentals with Bachelor’s Degree in CS (or similar technical field of study) or equivalent practical experience.\r\nAt least 2 years of experience as a Web Developer.\r\nGood English skills.\r\nKnowledge of PHP, Javascript, Dat', 0, '2020-10-06 22:43:39', 'T2-T6'),
(19, 7, 4, 'Senior Software Engineer, Mobile (iOS)', 1, 0, 0, 'Work closely with the Product, UX/UI and Backend teams to design, build and extend consumer and/or partner facing new products, platforms and features.\r\nBuild reusable Android software components for the Grab platform.\r\nCollaborate with QA on continuous integration and delivery (CI/CD) as well as other automated and manual testing to make sure our app releases are always worthy of five-star ratings.\r\nMonitor the performance of the live apps and continuously improve them on both code and experience level.\r\nRaise the bar by reviewing each other\'s code, share knowledge, tips and tricks, and generally help out - within and across teams. This may include pair programming.\r\nEvaluate new mobile methodologies and technologies.', 'A degree in computer science, software engineering, information technology or related fields.\r\nAt least 5 years of experience in iOS app development\r\nUp-to-date on the modern iOS programming paradigm, including the use of Swift.\r\nStrong UX/UI design exposure and experience in making apps work intuitively and with pixel perfect interfaces.\r\nYou have a working knowledge of several architectural approaches, design, caching, data storage and security.\r\nStrong CS fundamentals (with competencies in algorithms and data structures).\r\nYou are highly accountable and take ownership. You also have a collaborative attitude, because ‘Your Problem Is My Problem’ (YPIMP).', 0, '2020-11-09 14:08:34', 'T2-T6'),
(20, 7, 4, 'Senior Backend Engineer (Golang/Java)', 3, 0, 0, 'Get to know the role\r\n\r\nLearn and influence the fundamentals of engineering at Grab\r\nRelentless focus on delivering high-quality, maintainable and bug-free code at scale\r\nDiscuss and debate with other team members to find optimal solutions\r\nMonitor systems to make sure there is no disruption in our services\r\nThe day-to-day activities\r\n\r\nDesign and write cutting-edge backend services for Grab\'s range of products that serve millions of users\r\nConceive, analyze, design, build and maintain large-scale systems, ensuring system is robust, highly optimized for performance, highly scalable, highly available.\r\nWork with your team to explore and create new designs geared towards scale and performance\r\nParticipate in code and design reviews to maintain our high development standards\r\nWork with product managers, data analysts and UI designers to implement products and test their impact to business metrics\r\nEngage in service capacity and demand planning, software performance analysis, tuning and optimization\r\nCollaborate with product and experience teams to define and prototype features\r\nWork closely with infrastructure team in building and scaling back-end services as well as performing root-cause analysis investigations\r\nConduct performance tuning and optimization\r\nDebug and modify complex, production software ', 'The must haves\r\n\r\n5-7 years backend experience\r\nStrong computer science fundamentals in algorithms and data structures\r\nFamiliarity with running large scale microservices services\r\nStrong understanding of system performance and scaling\r\nExcellent communication skills, sharp analytical abilities with proven design skills, ability to think critically system growth and stability\r\nFamiliarity with AWS\r\nExperience in writing good unit tests\r\nConversational English\r\nNice to have\r\n\r\nWork experience in Java or Go (strongly preferred)\r\nA degree in Computer Science, Software Engineering or related fields\r\nUnderstanding of distributed systems and network protocols\r\nFamiliar with Cloud service providers: AWS\r\nElastic Search, MySQL, Cassandra, DynamoDB, Kafka, Redis, Terraform, Docker, Gitlab, Jenkins, LUA ', 0, '2020-11-09 14:12:26', 'T2-T6'),
(22, 8, 8, 'Technical Architect (PHP, JavaScript)', 1, 2000, 4000, 'You will be joining an awesome startup team to build cool applications that serve millions of users, from idea to production.\r\nAs our customers are typically ambitious foreign startups, you will have a chance to improve your English, learn about startup culture and product mindset along the way. If you want to make a great impact on the world, this is your chance now.\r\nManaging full lifecycle customer projects with Agile methods.\r\nDeveloping strong relationships with customers, acting as the primary point of contact as well as managing stakeholder expectations and always seek for solution improvement.\r\nDesign, develop, test internal REST API\r\nDesign and implement scalable and robust applications\r\nAnalyze functional requirements and creation of software design\r\nParticipate in code and design reviews to maintain our high development standards\r\nWork closely with infrastructure team in building and scaling back-end services as well as performing root-cause analysis investigations\r\nWrite API documentation for better communication with front-end developers', '5+ years of overall software development experience, with an emphasis on web applications  both Frontend (ReactJS/VueJS) and Backend (PHP, Python, RoR, DevOps, etc.)\r\nProficient understanding of code versioning tools (Git is preferred)\r\nDeep knowledge of web frameworks\r\nExperience in unit testing frameworks\r\nExperience in CI/CD methodologies\r\n2 years of experience in leading engineering teams\r\nGood at verbal and written in English', 0, '2020-11-11 17:01:06', 'T2 - T6');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_position`
--

CREATE TABLE `job_position` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `job_position`
--

INSERT INTO `job_position` (`position_id`, `position_name`) VALUES
(1, 'Intern'),
(2, 'Fresher'),
(3, 'Junior'),
(4, 'Senior'),
(5, 'PM'),
(6, 'Tester'),
(7, 'QA/QC'),
(8, 'Technical');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `province`
--

CREATE TABLE `province` (
  `province_id` int(11) NOT NULL,
  `province_name` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `province`
--

INSERT INTO `province` (`province_id`, `province_name`) VALUES
(1, 'Hà Nội'),
(2, 'TP HCM'),
(3, 'Đà Nẵng'),
(4, 'An Giang'),
(5, 'Bà Rịa - Vũng Tàu'),
(6, 'Bắc Giang'),
(7, 'Bắc Kạn'),
(8, 'Bạc Liêu'),
(9, 'Bắc Ninh'),
(10, 'Bến Tre'),
(11, 'Bình Định'),
(12, 'Bình Dương'),
(13, 'Bình Phước'),
(14, 'Bình Thuận'),
(15, 'Cà Mau'),
(16, 'Cần Thơ'),
(17, 'Cao Bằng'),
(18, 'Đắk Lắk'),
(19, 'Đắk Nông'),
(20, 'Điện Biên'),
(21, 'Đồng Nai'),
(22, 'Đồng Tháp'),
(23, 'Gia Lai'),
(24, 'Hà Giang'),
(25, 'Hà Nam'),
(26, 'Hà Tĩnh'),
(27, 'Hải Dương'),
(28, 'Hải Phòng'),
(29, 'Hậu Giang'),
(30, 'Hòa Bình'),
(31, 'Hưng Yên'),
(32, 'Khánh Hòa'),
(33, 'Kiên Giang'),
(34, 'Kon Tum'),
(35, 'Lai Châu'),
(36, 'Lâm Đồng'),
(37, 'Lạng Sơn'),
(38, 'Lào Cai'),
(39, 'Long An'),
(40, 'Nam Định'),
(41, 'Nghệ An'),
(42, 'Ninh Bình'),
(43, 'Ninh Thuận'),
(44, 'Phú Thọ'),
(45, 'Quảng Bình'),
(46, 'Quảng Nam'),
(47, 'Quảng Ngãi'),
(48, 'Quảng Ninh'),
(49, 'Quảng Trị'),
(50, 'Sóc Trăng'),
(51, 'Sơn La'),
(52, 'Tây Ninh'),
(53, 'Thái Bình'),
(54, 'Thái Nguyên'),
(55, 'Thanh Hóa'),
(56, 'Thừa Thiên Huế'),
(57, 'Tiền Giang'),
(58, 'Trà Vinh'),
(59, 'Tuyên Quang'),
(60, 'Vĩnh Long'),
(61, 'Vĩnh Phúc'),
(62, 'Yên Bái'),
(63, 'Phú Yên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `techcompany`
--

CREATE TABLE `techcompany` (
  `techCompany_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `techcompany`
--

INSERT INTO `techcompany` (`techCompany_id`, `company_id`, `technology_id`) VALUES
(42, 7, 21),
(43, 7, 24),
(44, 7, 31),
(45, 7, 32),
(46, 7, 55),
(50, 1, 2),
(51, 1, 3),
(52, 1, 6),
(53, 8, 13),
(54, 8, 21),
(55, 8, 31),
(56, 8, 44),
(57, 8, 49);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `techjob`
--

CREATE TABLE `techjob` (
  `techjob_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `techjob`
--

INSERT INTO `techjob` (`techjob_id`, `job_id`, `technology_id`) VALUES
(4, 2, 3),
(5, 2, 48),
(33, 19, 27),
(34, 19, 65),
(35, 19, 70),
(36, 20, 6),
(37, 20, 24),
(38, 20, 31),
(39, 22, 32),
(40, 22, 49),
(41, 22, 62);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `technology`
--

CREATE TABLE `technology` (
  `technology_id` int(11) NOT NULL,
  `technology_name` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Đang đổ dữ liệu cho bảng `technology`
--

INSERT INTO `technology` (`technology_id`, `technology_name`) VALUES
(1, 'Agile'),
(2, 'Android'),
(3, 'Angular'),
(4, 'AngularJS'),
(5, 'ASP.NET'),
(6, 'AWS'),
(7, 'Blockchain'),
(8, 'Bridge Engineer'),
(9, 'Business Analyst'),
(10, 'C#'),
(11, 'C++'),
(12, 'C language'),
(13, 'Cloud'),
(14, 'CSS'),
(15, 'Database'),
(16, 'Designer'),
(17, 'DevOps'),
(18, 'Django'),
(19, 'Drupal'),
(20, 'Embedded'),
(21, 'English'),
(22, 'ERP'),
(23, 'Games'),
(24, 'Golang'),
(25, 'HTML5'),
(26, 'Hybrid'),
(27, 'iOS'),
(28, 'IT Support'),
(29, 'J2EE'),
(30, 'Japanese'),
(31, 'Java'),
(32, 'JavaScript'),
(33, 'JQuery'),
(34, 'JSON'),
(35, 'Kotlin'),
(36, 'Laravel'),
(37, 'Linux'),
(38, 'Magento'),
(39, 'Manager'),
(40, 'MVC'),
(41, 'MySQL'),
(42, '.NET'),
(43, 'Networking'),
(44, 'NodeJS'),
(45, 'NoSQL'),
(46, 'Objective C'),
(47, 'OOP'),
(48, 'Oracle'),
(49, 'PHP'),
(50, 'PostgreSql'),
(51, 'Product Manager'),
(52, 'Project Manager'),
(53, 'Python'),
(54, 'QA QC'),
(55, 'ReactJS'),
(56, 'React Native'),
(57, 'Ruby'),
(58, 'Ruby on Rails'),
(59, 'SAP'),
(60, 'Scala'),
(61, 'Sharepoint'),
(62, 'Software Architect'),
(63, 'Spring'),
(64, 'SQL'),
(65, 'Swift'),
(66, 'System Admin'),
(67, 'System Engineer'),
(68, 'Team Leader'),
(69, 'Tester'),
(70, 'UI-UX'),
(71, 'Unity'),
(72, 'VueJS'),
(73, 'Wordpress'),
(74, 'Xamari');

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
  ADD KEY `apply_ibfk_1` (`candidate_id`),
  ADD KEY `apply_ibfk_2` (`job_id`);

--
-- Chỉ mục cho bảng `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`candidate_id`),
  ADD KEY `candidate_ibfk_1` (`accountId`);

--
-- Chỉ mục cho bảng `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `company_ibfk_1` (`account_id`),
  ADD KEY `company_ibfk_2` (`province_id`);

--
-- Chỉ mục cho bảng `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `job_ibfk_1` (`company_id`),
  ADD KEY `job_ibfk_2` (`position_id`);

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
-- Chỉ mục cho bảng `techcompany`
--
ALTER TABLE `techcompany`
  ADD PRIMARY KEY (`techCompany_id`),
  ADD KEY `techcompany_ibfk_1` (`company_id`),
  ADD KEY `techcompany_ibfk_2` (`technology_id`);

--
-- Chỉ mục cho bảng `techjob`
--
ALTER TABLE `techjob`
  ADD PRIMARY KEY (`techjob_id`),
  ADD KEY `techjob_ibfk_1` (`job_id`),
  ADD KEY `techjob_ibfk_2` (`technology_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT cho bảng `apply`
--
ALTER TABLE `apply`
  MODIFY `apply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `candidate`
--
ALTER TABLE `candidate`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `job`
--
ALTER TABLE `job`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `job_position`
--
ALTER TABLE `job_position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `techcompany`
--
ALTER TABLE `techcompany`
  MODIFY `techCompany_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT cho bảng `techjob`
--
ALTER TABLE `techjob`
  MODIFY `techjob_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT cho bảng `technology`
--
ALTER TABLE `technology`
  MODIFY `technology_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `apply`
--
ALTER TABLE `apply`
  ADD CONSTRAINT `apply_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `candidate`
--
ALTER TABLE `candidate`
  ADD CONSTRAINT `candidate_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `company_ibfk_2` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `job_ibfk_2` FOREIGN KEY (`position_id`) REFERENCES `job_position` (`position_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `techcompany`
--
ALTER TABLE `techcompany`
  ADD CONSTRAINT `techcompany_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `techcompany_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`technology_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `techjob`
--
ALTER TABLE `techjob`
  ADD CONSTRAINT `techjob_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `techjob_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`technology_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
