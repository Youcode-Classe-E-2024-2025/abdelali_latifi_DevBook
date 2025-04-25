-- Active: 1733492701458@@127.0.0.1@3306@devbook

CREATE DATABASE devbook;

USE devbook;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin') NOT NULL DEFAULT 'client'
);




CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    page_count INT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);


CREATE TABLE borrowings (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    book_id INT NOT NULL, 
    borrowed_at DATE NOT NULL, -- La date à laquelle l'utilisateur a emprunté le livre.
    due_date DATE NOT NULL, -- La date limite de retour du livre.
    returned_at DATE DEFAULT NULL, -- La date à laquelle le livre a été retourné (NULL si non retourné).
    status ENUM('borrowed', 'returned') DEFAULT 'borrowed', 
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (book_id) REFERENCES books(id)
);



SELECT DATABASE();

DESCRIBE users;


SELECT * FROM users;

SELECT * FROM categories;   

 UPDATE users SET role = 'admin' WHERE id = 15;