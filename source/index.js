'use strict';
/* eslint-disable no-console */
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Howdy!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));