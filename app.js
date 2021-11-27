const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const routesNavigation = require('./routes/routesNavigation')
const PORT = process.env.APP_PORT || 3000;
require('dotenv').config();

const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Credentials", true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.get('/', (req, res) => {
    res.send('Embreo API is running')
});

app.use('/api/embreo', routesNavigation)

app.listen(PORT, () => {   
    console.log(`Server is running on port ${PORT}`);
});