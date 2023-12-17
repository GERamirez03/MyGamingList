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

CREATE TABLE games 
(
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    summary TEXT NOT NULL,
    first_release_date BIGINT NOT NULL,
    cover_url TEXT DEFAULT NULL
);

CREATE TABLE users_games
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    game_id INT REFERENCES games (id),
    rating FLOAT DEFAULT 2.5
);

CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    body TEXT,
    author TEXT REFERENCES users (username),
    game_id INT REFERENCES games(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT NOT NULL DEFAULT 0
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    review_id INT REFERENCES reviews (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT NOT NULL DEFAULT 0
);