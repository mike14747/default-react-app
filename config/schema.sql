DROP DATABASE IF EXISTS testDB1;
CREATE DATABASE testDB1;
USE testDB1;

CREATE TABLE users (
    user_id int(6) NOT NULL AUTO_INCREMENT,
    username varchar(30) NOT NULL,
    password varchar(30) NOT NULL,
    PRIMARY KEY (user_id)
);
