const express = require('express');

const cors = require('cors');

const axios = require('axios');

require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());

PORT = { process.env.PORT } || 3010;

const mongoose = require('mongoose');
mongoose.connect('mongodb://duaa-tarazi:<saleh62439999>@cluster0-shard-00-00.hgipu.mongodb.net:27017,cluster0-shard-00-01.hgipu.mongodb.net:27017,cluster0-shard-00-02.hgipu.mongodb.net:27017/flowersDataBase?ssl=true&replicaSet=atlas-n6w4ln-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

const flowersschema = new mongoose.Schema({
    instructions: String,
    photo: String,
    name: String
});
const userSchema = new mongoose.Schema({
    email: string,
    flowerArr=[flowersschema]
});

const flowers = mongoose.model('flowers', flowersschema);
const user = mongoose.model('user', userSchema);

function flowersSeeding() {
    const user = new flowers({
        instructions: "Large double. Good grower, heavy bloomer. Early to mid-season, acid loving plants. Plant in moist well drained soil with pH of 4.0-5.5.",
        photo: "https://www.miraclegro.com/sites/g/files/oydgjc111/files/styles/scotts_asset_image_720_440/public/asset_images/main_021417_MJB_IMG_2241_718x404.jpg?itok=pbCu-Pt3",
        name: "Azalea"
    })
    const roaa = new flowers({
        instructions: "Beautiful large royal purple flowers adorn attractive satiny green leaves that turn orange\\/red in cold weather. Grows to up to 18 feet, or prune annually to shorten.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flower_in_Horton_Plains_1.jpg",
        name: "Tibouchina Semidecandra"

    })

    user.save();
    roaa.save();
}
flowersSeeding()

function userSeeding() {
    const duaa = new user({
        email: "dst08itk@gmail.com",
        flowerArr: [{
            instructions: "Beautiful large royal purple flowers adorn attractive satiny green leaves that turn orange\\/red in cold weather. Grows to up to 18 feet, or prune annually to shorten.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flower_in_Horton_Plains_1.jpg",
            name: "Tibouchina Semidecandra"
        }]
    })
    const roaa = new user({
        email: "roaa.abualeeqa@gmail.com",

        flowerArr: [{
            instructions: "Beautiful large royal purple flowers adorn attractive satiny green leaves that turn orange\\/red in cold weather. Grows to up to 18 feet, or prune annually to shorten.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flower_in_Horton_Plains_1.jpg",
            name: "Tibouchina Semidecandra"

        }]
    })
 duaa.save();
        roaa.save();
    }
    userSeeding() 

  //http:localhost:3010/
  server.get('/', (req, res)){
        res.send('hello from the other side');
    };
    //http:localhost:3010/getData
    server.get('/getData', getData);

    const getData =((req.res)=> {
        axios.get('https://flowers-api-13.herokuapp.com/getFlowers')
             .then((result)=>{
                 res.send(result[0].flowerslist);
             })
           .catch()
    })
    //http:localhost:3010/postHandler

    server.post("/postingFav",postHandler)



    server.listen(req, res){
        res.send(`ima listning to PORT ${PORT}`);
    };
//   server.put();

