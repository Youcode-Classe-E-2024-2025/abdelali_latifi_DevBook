const express = require('express');
const bodyParser = require('body-parser');
const BookRoute = require('./routes/BookRoute');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', BookRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
