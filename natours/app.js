const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

app.get('/api/v1/', (req, res) => {
  const tours = fs.readFile('../dev-data/data/tours.json');
  res
    .status(200)
    .json({ message: 'success', result: tours.length, data: { tours: tours } });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
