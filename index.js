const express = require("express");
require('express-async-errors');
require('./startup/log');

const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');

app.listen(5000, () => {
  console.log("Server has started!");
});