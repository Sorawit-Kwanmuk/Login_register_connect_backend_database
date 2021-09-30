//คำสั่ง สร้าง table
// const { sequelize } = require('./models');
// sequelize.sync({
//   force: true,
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const listRoute = require('./routes/listRoute');
const errorController = require('./controllers/errorController');

const app = express();

//midldleware cors:allow access origin cross sharing
app.use(cors());
app.use(express.json());

//List Route
app.use('/lists', listRoute);
//Authendication Route
app.use('/', authRoute);

//path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

//error handling middleware
app.use(errorController);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
