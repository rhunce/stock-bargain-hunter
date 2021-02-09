const express = require('express');
const path = require('path');
const parser = require('body-parser');

let app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

