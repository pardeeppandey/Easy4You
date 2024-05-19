const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000

const mongdb = require('./db')

mongdb();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept'
    );
    next();
})

app.use('/api', require('./routes/Createandloginuser'));
app.use('/api', require('./routes/Usercomment'));
app.use('/api', require('./routes/Userhistoryy'));
app.use('/api', require('./routes/Displayuserhistory'));
app.use('/api', require('./routes/Displayuserprofile'));
app.use('/api', require('./routes/driversignupandlogin'));
app.use('/api', require('./routes/Displaydriverprofile'));
app.use('/api', require('./routes/Driverhistoryy'));
app.use('/api', require('./routes/Displaydriverhistory'));


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})
