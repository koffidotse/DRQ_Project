// Server Setup local host 4000 
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//to avoid cors error 
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname,'../build')));
app.use('/static', express.static(path.join(__dirname, 'build/static')));//find static
//set up configuration these will tell where to find important files
app.use(express.static(path.join(__dirname,'../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Connection added with mongoDb
const myConnectionString =  "mongodb+srv://admin:Aadil_khann@cluster0.xvk7v.mongodb.net/db_car?retryWrites=true&w=majority";

mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const gamesSchema = new Schema({
    Title: String,
    Year: String,
    Genres: String
})
//create model for database
const gameModel = mongoose.model('games', gamesSchema);

app.get('/', (req, res) => {
    res.send('Into the game world')
})

app.get('/api/games', (req, res) => {
    
    // eslint-disable-next-line array-callback-return
    gameModel.find((err,data)=>{
        res.json(data);
    })
})

app.get('/api/games/:id',(req, res)=>{
    gameModel.findById(req.params.id, (err,data)=>{
        res.json(data);
    })
})
//delete method 
app.delete('/api/games/:id', (req, res)=>{
    gameModel.findByIdAndDelete({_id: req.params.id},
         (err, data)=>{
        res.send(data);
    })
})

// adding games data to mongodb
app.post('/api/games', (req, res) => {
    console.log(req.body);
    gameModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Genres: req.body.Genres
    })
    .then()
    .catch();

    res.send('Game data posted in mongoDB');
})

app.put('/api/updateGame', (req, res) => {
    gameModel.update(
        {
            _id: req.body._id
        },
        {
            $set: {
                Title: req.body.Title,
                Year: req.body.Year,
                Genres: req.body.Genres
            }
        }
    )
    .then()
    .catch();

    res.send('Data Recieved!');
})

//this method will return html front end file 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})