const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbpath = path.join(__dirname, "./todoApplication.db");

let db = null;

app.use(express.json());

const initializedatabaseserver = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("The server is at 3000");
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
initializedatabaseserver();

app.get("/todos/", async (request, response) => {
  const { status = "", priority = "", search_q = "" } = request.query;
  console.log(status, priority, search_q);
  const changedStatus = status.replace(" ", "%20");
  console.log(changedStatus);
  const todoDetailsQuery = `SELECT * FROM todo where status = ${changedStatus}`;
  const todoDetails = await db.all(todoDetailsQuery);
  response.send(todoDetails);
});

module.exports = app;
