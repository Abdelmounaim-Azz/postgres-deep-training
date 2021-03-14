const app = require("./src/app.js");
const pool = require("./src/pool");
const keys = require("./keys");

pool
  .connect({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
  })
  .then(() => {
    app().listen(4000, () => {
      console.log("Listening on port 4000");
    });
  })
  .catch((err) => console.error(err));
