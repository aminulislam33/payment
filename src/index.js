require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payment');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});