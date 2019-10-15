require('dotenv').config();
const express = require('express');
const db = require('./models/index');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    db.sequelize.sync({ force: true }).then(() => console.log('user sync successful'));

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', require('./routes/routes'));
app.use('/api/v1/auth', require('./routes/secret-routes/routes'));
