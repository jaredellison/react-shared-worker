const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = 3000;
const STATIC_PATH = path.join(__dirname, '../client/build');

const app = express();

app.use(morgan('dev'));
app.use(express.static(STATIC_PATH));

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));