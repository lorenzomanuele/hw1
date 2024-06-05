CREATE DATABASE ticketone;
USE ticketone;

CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(128) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
) Engine = InnoDB;

CREATE TABLE eventi (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    event_id VARCHAR(255),
    content json
) Engine = InnoDB;


CREATE TABLE canzoni (
    id NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    song_id VARCHAR(255),
    content json
) Engine = InnoDB;