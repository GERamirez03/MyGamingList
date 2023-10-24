/** Shared config for MyGamingList */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "mgl-secret-dev";

const JWT_OPTIONS = { expiresIn: 60 * 60 };

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql:///my_gaming_list_test"
      : process.env.DATABASE_URL || "postgresql:///my_gaming_list";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  JWT_OPTIONS,
  getDatabaseUri,
};
