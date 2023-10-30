const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
    const data = req.body;
    fs.readFile('data.json', 'utf8', (err, jsonString) => {
        if (err) {
            fs.writeFileSync('data.json', JSON.stringify([data]));
        } else {
            const jsonArray = JSON.parse(jsonString);
            jsonArray.push(data);
            fs.writeFileSync('data.json', JSON.stringify(jsonArray));
        }
        res.json({ message: 'Données enregistrées avec succès !' });
    });
});

app.get('/api/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, jsonString) => {
        if (err) {
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        const data = JSON.parse(jsonString);
        res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
