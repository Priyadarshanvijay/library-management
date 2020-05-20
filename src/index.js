const express = require('express');
require('dotenv').config()
require('./db/mongoose');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
