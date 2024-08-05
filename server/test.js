const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const Data = mongoose.model('Data', dataSchema);

app.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
