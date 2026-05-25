-- Run this in phpMyAdmin to set up your portfolio database

CREATE DATABASE IF NOT EXISTS `portfolio_db`;
USE `portfolio_db`;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert a default admin user (Username: dhruv, Password: password123)
-- YOU MUST CHANGE THIS PASSWORD LATER in phpMyAdmin or through a script!
INSERT INTO `admin_users` (`username`, `password_hash`) VALUES
('dhruv', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `version` varchar(20) DEFAULT 'v1.0.0',
  `status` varchar(100) DEFAULT 'STATUS: ACTIVE',
  `description` text NOT NULL,
  `tags` varchar(255) NOT NULL COMMENT 'Comma separated tags like HTML,CSS,PHP',
  `folder_link` varchar(255) DEFAULT '#',
  `code_link` varchar(255) DEFAULT '#',
  `live_link` varchar(255) DEFAULT '#',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert initial projects to match existing portfolio
INSERT INTO `projects` (`title`, `version`, `status`, `description`, `tags`, `folder_link`, `code_link`, `live_link`) VALUES
('POS Billing System', 'v1.0.0', 'STATUS: OPERATIONAL // RETAIL SOLUTION', 'A full-featured Point of Sale billing system designed for provision stores. Handles product management, invoice generation, and real-time sales tracking with a clean browser-based interface connect...', 'HTML,CSS,JAVASCRIPT,PHP,PHPMYADMIN', '#', '#', 'https://hitanshparikh.tech/pos/'),
('Autonomous Rover', 'v1.2.0', 'STATUS: ACTIVE // HARDWARE & ROBOTICS', 'A remotely operated rover built on Raspberry Pi 5 with Arduino-based motor control. Uses servo motors for directional movement and encoders for precise speed and distance feedback, enabling...', 'ARDUINO IDE,RASPBERRY PI 5,SERVO MOTOR,ENCODER', '#', '#', '#');

-- Certificates Table
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert initial certificates
INSERT INTO `certificates` (`title`, `image_path`) VALUES
('Hashgraph Developer', 'certficats/HASHGRAPH DEVELOPER INDUSTRIAL COURCE.png'),
('Zero Day Chase', 'certficats/THE ZERO DAY CHASE EVENT COORDINATOR.png'),
('Barracks x Cyberkavach', 'certficats/BARRACKS X CYBERKAVACH WARZONE EVENT COORDINATOR.png'),
('Digital Forensic', 'certficats/DIGITAL FORENSIC COURSE.png'),
('Tech Sprint Hackathon', 'certficats/TECH SPRINT HACKATHON.png'),
('CSE Logo Winner', 'certficats/CSE DEPARTMENT LOGO COMPETITION - WINNER.png');

-- Visitor Tracking Table
CREATE TABLE IF NOT EXISTS `visitor_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `visit_time` timestamp DEFAULT CURRENT_TIMESTAMP,
  `page_url` varchar(255) DEFAULT NULL,
  `terminal_name` varchar(100) DEFAULT NULL,
  `terminal_clearance` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
