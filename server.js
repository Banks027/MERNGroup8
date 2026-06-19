// server.js
require('dotenv').config();

const express = require('express');
const connectDB = require('./db');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();  // connect to MongoDB on startup

app.use(express.json());
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// server.js
const errorHandler = require('./middleware/errorHandler');

// ... all other middleware and routes ...

app.use(errorHandler);  // last middleware