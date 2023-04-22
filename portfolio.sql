-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2023 at 01:32 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_section`
--

CREATE TABLE `about_section` (
  `id` int(11) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `freelance` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `about_section`
--

INSERT INTO `about_section` (`id`, `birthday`, `website`, `phone`, `city`, `email`, `freelance`) VALUES
(1, '6 April 2001', '<a href=\'hamansour.me\' target=\'_blank\'>hmansour.me</a>', '<a href=\'tel:+201202840018\'>+20 12 0284 0018</a>', 'Masr Elgedida, Egypt', '<a href=\'mailto:nbilha161@gmail.com\' target=\'_blank\'>nbilha161@gmail.com</a>', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `resume_section`
--

CREATE TABLE `resume_section` (
  `name` text NOT NULL,
  `summary` text NOT NULL,
  `location` text NOT NULL,
  `phone2` text NOT NULL,
  `email2` text NOT NULL,
  `time` text NOT NULL,
  `facts_about_education` text NOT NULL,
  `facts_about_udacity` text NOT NULL,
  `facts_about_university` text NOT NULL,
  `facts_about_route` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `resume_section`
--

INSERT INTO `resume_section` (`name`, `summary`, `location`, `phone2`, `email2`, `time`, `facts_about_education`, `facts_about_udacity`, `facts_about_university`, `facts_about_route`) VALUES
('Hesham Mansour Mohamed', '<em>I\'m software engineering student who loves development websites, My latest projects is building a responsive web page with a dynamic navbar and building a weather APP <br> Skills: HTML, CSS, JS, PHP, MYSQL, SQL</em>', 'Masr Elgdida, Cairo, EGYPT', '(20) 12-0284-0018', 'nbilha161@gmail.com', '2019 - Present', '<em>Bachelor of Software Engineering &amp; Information Technology</em>', '   <li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>\r\n                <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. </li>\r\n                <li>Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design</li>\r\n                <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>\r\n             ', '<li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>\r\n                <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. </li>\r\n                <li>Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design</li>\r\n                <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>\r\n              ', '<li>Developed numerous marketing programs (logos, brochures,infographics, presentations, and advertisements).</li>\r\n                <li>Managed up to 5 projects or tasks at a given time while under pressure</li>\r\n                <li>Recommended and consulted with clients on the most appropriate graphic design</li>\r\n                <li>Created 4+ design presentations and proposals a month for clients and account managers</li>\r\n              ');

-- --------------------------------------------------------

--
-- Table structure for table `services_section`
--

CREATE TABLE `services_section` (
  `services_1` varchar(255) NOT NULL,
  `services_1_facts` text NOT NULL,
  `services_2` varchar(255) NOT NULL,
  `services_2_facts` text NOT NULL,
  `services_3` varchar(255) NOT NULL,
  `services_3_facts` text NOT NULL,
  `services_4` varchar(255) NOT NULL,
  `services_4_facts` text NOT NULL,
  `services_5` varchar(255) NOT NULL,
  `services_5_facts` text NOT NULL,
  `services_6` varchar(255) NOT NULL,
  `services_6_facts` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `services_section`
--

INSERT INTO `services_section` (`services_1`, `services_1_facts`, `services_2`, `services_2_facts`, `services_3`, `services_3_facts`, `services_4`, `services_4_facts`, `services_5`, `services_5_facts`, `services_6`, `services_6_facts`) VALUES
('<a href=\'\'>Lorem Ipsum</a>', 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident', '<a href=\'\'>Dolor Sitema</a>', 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata', '<a href=\'\'>Sed ut perspiciatis</a>', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', '<a href=\'\'>Magni Dolores</a>', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', '<a href=\'\'>Nemo Enim</a>', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque', '<a href=\'\'>Eiusmod Tempor</a>', 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi');

-- --------------------------------------------------------

--
-- Table structure for table `superAdmin`
--

CREATE TABLE `superAdmin` (
  `id` int(11) NOT NULL,
  `usrName` varchar(30) DEFAULT NULL,
  `password` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_section`
--
ALTER TABLE `about_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `superAdmin`
--
ALTER TABLE `superAdmin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_section`
--
ALTER TABLE `about_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `superAdmin`
--
ALTER TABLE `superAdmin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
