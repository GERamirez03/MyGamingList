# MyGamingList

https://mygaminglist-frontend.onrender.com

This is a website where users can create profiles of their gaming lists, rate and review their games, and comment on others' reviews.

Users can immediately search for games or read user reviews of games, but will need to create an account or log in before they can begin curating their list.

When searching for games, users can add a game to their list from the game details page.

Once they have added a game to their list, users will be able to rate and write a review of a game from the game details page.

Users can also view each others' profiles via links in reviews or comments that direct the current user to the author's profile.

This website is powered by the Internet Game Database (IGDB) API from Twitch. The API has more features than those implemented in this website.

## Using the application

1. Clone the repo
2. Change the directory to the project folder
3. Ensure Postgres and Node are configured correctly
4. Create Postgres database with name "my_gaming_list"
5. Change the directory to the backend folder with `cd backend`
6. Install backend dependencies with `npm i`
7. Start the Express application with `npm start`
8. Change the directory to the frontend folder with `cd ../frontend`
9. Install frontend dependencies with `npm i`
10. Start the React application with `npm start`
11. Visit the app at localhost:3000. NPM should also launch the application in a browser window.
12. Enjoy!

## Stack

Frontend: React.js

Backend: Node.js Express

Database: PostgreSQL

## IGDB API

https://api-docs.igdb.com/#getting-started