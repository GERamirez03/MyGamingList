-- my_gaming_list
-- my_gaming_list_test

DROP DATABASE IF EXISTS my_gaming_list;

CREATE DATABASE my_gaming_list;

\c my_gaming_list

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- INSERT INTO users
--     (username, email)
-- VALUES
--     ('testUser', 'testUser@test.com'),
--     ('testDev', 'testDev@test.com'),
--     ('testAdmin', 'testAdmin@test.com');