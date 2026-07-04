-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2026 a las 19:19:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorio_clinico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'Bioanalista que registró el examen',
  `exam_type` varchar(50) NOT NULL COMMENT 'Serología, Hematología, Coagulación, etc.',
  `exam_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `exams`
--

INSERT INTO `exams` (`id`, `patient_id`, `user_id`, `exam_type`, `exam_date`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Serología', '2026-07-03', 'Primer examen de Serología', '2026-07-03 21:02:29', '2026-07-03 21:02:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exam_parameters`
--

CREATE TABLE `exam_parameters` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `param_id` varchar(50) NOT NULL COMMENT 'Identificador único del parámetro (ej: vdrl, pcr, etc.)',
  `param_name` varchar(100) NOT NULL COMMENT 'Nombre legible del parámetro',
  `value` varchar(255) DEFAULT NULL COMMENT 'Valor guardado (puede ser texto o número)',
  `unit` varchar(20) DEFAULT NULL COMMENT 'Unidad de medida (opcional)',
  `reference_min` decimal(10,2) DEFAULT NULL,
  `reference_max` decimal(10,2) DEFAULT NULL,
  `type` enum('number','select','text') DEFAULT 'number' COMMENT 'Tipo de parámetro',
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Opciones para campos tipo select' CHECK (json_valid(`options`)),
  `low_threshold` decimal(10,2) DEFAULT NULL,
  `low_critical_threshold` decimal(10,2) DEFAULT NULL,
  `high_threshold` decimal(10,2) DEFAULT NULL,
  `high_critical_threshold` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `exam_parameters`
--

INSERT INTO `exam_parameters` (`id`, `exam_id`, `param_id`, `param_name`, `value`, `unit`, `reference_min`, `reference_max`, `type`, `options`, `low_threshold`, `low_critical_threshold`, `high_threshold`, `high_critical_threshold`, `created_at`) VALUES
(11, 1, 'vdrl', 'VRDL', 'Reactivo', NULL, NULL, NULL, 'select', '[\"Reactivo\", \"No Reactivo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(12, 1, 'pcr', 'PCR', 'Positivo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(13, 1, 'ra_test', 'RA TEST', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(14, 1, 'toxoplasmosis', 'TOXOPLASMOSIS', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(15, 1, 'monotest', 'MONOTEST', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(16, 1, 'asto', 'ASTO', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(17, 1, 'test_pack_sangre', 'TEST PACK EN SANGRE', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(18, 1, 'prueba_embarazo_orina', 'PRUEBA DE EMBARAZO EN ORINA', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(19, 1, 'hiv', 'HIV', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(20, 1, 'piloriset', 'PILORISET', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:09:25'),
(31, 1, 'vdrl', 'VRDL', 'Reactivo', NULL, NULL, NULL, 'select', '[\"Reactivo\", \"No Reactivo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(32, 1, 'pcr', 'PCR', 'Positivo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(33, 1, 'ra_test', 'RA TEST', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(34, 1, 'toxoplasmosis', 'TOXOPLASMOSIS', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(35, 1, 'monotest', 'MONOTEST', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(36, 1, 'asto', 'ASTO', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(37, 1, 'test_pack_sangre', 'TEST PACK EN SANGRE', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(38, 1, 'prueba_embarazo_orina', 'PRUEBA DE EMBARAZO EN ORINA', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(39, 1, 'hiv', 'HIV', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16'),
(40, 1, 'piloriset', 'PILORISET', 'Negativo', NULL, NULL, NULL, 'select', '[\"Positivo\", \"Negativo\"]', NULL, NULL, NULL, NULL, '2026-07-03 21:27:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `identification` varchar(8) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `age` int(3) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` enum('M','F','Otro') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`id`, `full_name`, `identification`, `phone`, `age`, `birth_date`, `gender`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Juan Perezz', '12345679', '04121694500', 25, '2003-01-15', 'M', 'creolandio', '2026-07-03 19:28:43', '2026-07-03 20:10:54'),
(6, 'Maria', '87654321', '04124568956', 0, '2026-07-02', 'F', 'caraca', '2026-07-04 00:31:01', '2026-07-04 00:32:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('bioanalyst','admin') NOT NULL DEFAULT 'bioanalyst',
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`, `profile_image`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '$2b$12$N4KYc6yRTB8aKll7.lT9U.esqjiyoqG1d1sF0m1j2Q3yBmmS8rtu6', 'bioanalyst', NULL, '2026-07-03 11:43:29', '2026-07-03 11:43:29'),
(2, 'Jesús Suárez', 'jesus@ejemploo.com', '$2b$12$K.gpOizm6NrvcClk1EfXTevldr3Jazn8gPlCrX39DeuwRFLDpZaBu', 'bioanalyst', NULL, '2026-07-03 16:02:37', '2026-07-03 16:02:37'),
(3, 'Prueba Frontend', 'frontend-test@example.com', '$2b$12$tR9xUbs5qUCDK7DFHrY9zex7GREW99nUMrpwO3f/5JFavaKUOdY7a', 'bioanalyst', NULL, '2026-07-03 16:24:39', '2026-07-03 16:24:39'),
(4, 'jesus', 'ejemplo@ejemplo.com', '$2b$12$HZaDMMFxrJsIKqxL3IDlceLZYJihhcyyxL9MJATZax26a0TMDE.pS', 'bioanalyst', NULL, '2026-07-03 16:43:47', '2026-07-03 16:43:47'),
(5, 'jesus', 'correo@correo.com', '$2b$12$Af7G/wFgnMql9BHBhkV4V.uvJpXOOcSoN5SPJ94PtfKWHNix0tH/e', 'bioanalyst', NULL, '2026-07-03 17:11:25', '2026-07-03 17:11:25'),
(6, 'Jesús', 'bioanalista@lab.com', '$2b$12$5iUhMVvuV1km.ofq4EsYmOOPaZQ5FaVuZO7HFr/vCJGPxrI1wQ9P6', 'bioanalyst', NULL, '2026-07-03 17:19:59', '2026-07-03 17:19:59');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_exams_patient` (`patient_id`),
  ADD KEY `idx_exams_user` (`user_id`),
  ADD KEY `idx_exams_type` (`exam_type`);

--
-- Indices de la tabla `exam_parameters`
--
ALTER TABLE `exam_parameters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_exam_param` (`exam_id`);

--
-- Indices de la tabla `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identification` (`identification`),
  ADD UNIQUE KEY `ix_patients_identification` (`identification`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `ix_users_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `exam_parameters`
--
ALTER TABLE `exam_parameters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `fk_exams_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_exams_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `exam_parameters`
--
ALTER TABLE `exam_parameters`
  ADD CONSTRAINT `fk_exam_param_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
