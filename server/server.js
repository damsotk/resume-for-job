const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const dataPath = path.join(__dirname, 'data.json');

let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

app.get('/leap-to-riches/:id', (req, res) => {
  console.log(`GET request for player with id ${req.params.id}`);
  const player = data['leap-to-riches'].find(p => p.id === req.params.id);
  if (player) {
    res.json(player);
  } else {
    res.status(404).send('Player not found');
  }
});

app.put('/leap-to-riches/:id', (req, res) => {
  console.log(`PUT request for player with id ${req.params.id}`);
  const playerIndex = data['leap-to-riches'].findIndex(p => p.id === req.params.id);
  if (playerIndex !== -1) {
    data['leap-to-riches'][playerIndex] = req.body;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json(data['leap-to-riches'][playerIndex]);
  } else {
    res.status(404).send('Player not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
