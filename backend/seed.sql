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

-- video game data from IGDB API
CREATE TABLE games 
(
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    summary TEXT NOT NULL,
    first_release_date BIGINT NOT NULL,
    cover_url TEXT DEFAULT NULL,
    platforms TEXT NOT NULL
);

CREATE TABLE users_games
(
    -- id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    game_id INT REFERENCES games (id),
    rating FLOAT DEFAULT 0, -- Each user_id's rating of game_id
    PRIMARY KEY (user_id, game_id)
);

-- Global ratings of games, averaged across all MGL users' individual ratings
CREATE TABLE ratings
(
    game_id INT REFERENCES games (id),
    rating FLOAT DEFAULT 0 
    -- give users option to CRUD their ratings, reviews, feedback! 
    -- NOTES: 
    -- can use AVERAGE to help with computations
    -- select sum(rating) from uses_games where game_id = 123
    -- select rating from users_game where game_id = 123 and user_id = [logged in user]
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT NOT NULL DEFAULT 0
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    review_id INT REFERENCES reviews (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modified_column BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_modified_column BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();