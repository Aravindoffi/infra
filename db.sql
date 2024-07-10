CREATE DATABASE form_data;

USE form_data;

CREATE TABLE submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    country VARCHAR(255) NOT NULL,
    hobby VARCHAR(255) NOT NULL
);
