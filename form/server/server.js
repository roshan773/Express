const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const dbPath = './db.json';

app.post('/api/products', (req, res) => {
    const { name, price, description } = req.body;

    // Read existing data
    let data = [];
    if (fs.existsSync(dbPath)) {
        data = JSON.parse(fs.readFileSync(dbPath));
    }

    // Create new product with auto-incremented ID
    const newProduct = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        name,
        price,
        description
    };

    data.push(newProduct);

    // Save to db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: 'Product added', product: newProduct });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
