const express = require('express');

const app = express();
const api = require('./api');

require('dotenv').config();

const port = process.env.PORT || 4000;

app.use(require('morgan')('dev'));
app.engine('html', require('ejs').renderFile);
app.use('/api', api);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});