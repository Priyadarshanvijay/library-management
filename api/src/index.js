const express = require('express');
const cors = require('cors');
require('dotenv').config()
require('./db/mongoose');
const userRouter = require('./routes/user');
const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(authorRouter);
app.use(bookRouter);


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
