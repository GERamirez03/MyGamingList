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
    email TEXT UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT false
);

-- INSERT INTO users
--     (username, email)
-- VALUES
--     ('testUser', 'testUser@test.com'),
--     ('testDev', 'testDev@test.com'),
--     ('testAdmin', 'testAdmin@test.com');

CREATE TABLE games 
(
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    summary TEXT NOT NULL,
    first_release_date BIGINT NOT NULL
);

CREATE TABLE users_games
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    game_id INT REFERENCES games (id)
);

CREATE TABLE covers
(
    id INT PRIMARY KEY,
    game_id INT REFERENCES games (id),
    url TEXT NOT NULL,
    height INT NOT NULL,
    width INT NOT NULL
);