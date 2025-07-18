
const express = require('express');
const cors = require('cors');
const app = express();


let students = [
  { name: 'Tirth Patel', class: 'BCA 3rd Year', roll: 101, mobile: '9999988888', address: 'Surat' },
  { name: 'Nirali Shah', class: 'BCA 3rd Year', roll: 102, mobile: '8888877777', address: 'Vadodara' },
  { name: 'Ravi Mehta', class: 'BCA 2nd Year', roll: 201, mobile: '7777766666', address: 'Ahmedabad' },
  { name: 'Sneha Joshi', class: 'BCA 1st Year', roll: 301, mobile: '6666655555', address: 'Rajkot' }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const { name, class: stdClass, roll, mobile, address } = req.body;
  students.push({ name, class: stdClass, roll, mobile, address });
  res.json({ success: true, message: 'Student added successfully' });
});

const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
  { username: 'admin', password: 'admin' }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ success: true });
  return res.json({ success: false });
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'User already exists' });
  }
  users.push({ username, password });
  return res.json({ success: true, message: 'Registered successfully' });
});


app.get('/api/results', (req, res) => {
  res.json([{ roll: 101, subject: 'Math', marks: 88 }]);
});
app.get('/api/attendance', (req, res) => {
  res.json([{ roll: 101, present: 90, total: 100 }]);
});
app.get('/api/teachers', (req, res) => {
  res.json([{ name: 'Prof. Shah', subject: 'CS' }]);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


app.put('/api/students/:roll', (req, res) => {
  const roll = parseInt(req.params.roll);
  const index = students.findIndex(s => s.roll === roll);
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json({ success: true, message: 'Student updated successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Student not found' });
  }
});

app.delete('/api/students/:roll', (req, res) => {
  const roll = parseInt(req.params.roll);
  const index = students.findIndex(s => s.roll === roll);
  if (index !== -1) {
    students.splice(index, 1);
    res.json({ success: true, message: 'Student deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Student not found' });
  }
});
