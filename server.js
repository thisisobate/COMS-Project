require('express-async-errors')
const CustomError = require("./helpers/CustomError");
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const path = require('path');
const morgan = require('morgan');

const errorHandler = require('./middlewares/errorHandler');

const apiRoutes = require('./routes/apiRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');

const databaseConfig = require('./config/db');
const port = process.env.PORT || 3030;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes())
app.use('/student', studentRoutes())
app.use('/staff', staffRoutes())

// app.use((req, res, next) => {
//   throw new CustomError("Page not found", 404);
// });

app.use(errorHandler);

server.listen(port, () => {
  console.log(`:: server listening on port ${port}`);
  databaseConfig();
});

