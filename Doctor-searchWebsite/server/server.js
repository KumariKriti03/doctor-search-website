const express = require('express');
const cors = require('cors'); // Import the cors middleware
const connectDB = require('./config/db');
const user = require('./routes/user.routes');
const doctor = require('./routes/doctor.routes')

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/user', user);
app.use('/doctor',doctor)

connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080!');
});
