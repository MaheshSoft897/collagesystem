const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');

// Load data
let data = { students: [], results: [], attendance: [], teachers: [] };
if (fs.existsSync(dataFile)) {
  data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
}

app.get('/api/students', (req, res) => res.json(data.students));
app.get('/api/results', (req, res) => res.json(data.results));
app.get('/api/attendance', (req, res) => res.json(data.attendance));
app.get('/api/teachers', (req, res) => res.json(data.teachers));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));