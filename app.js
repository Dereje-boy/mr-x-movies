const express = require("express")
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
const body_parser = require("body-parser")

const movies = require('./routes/movies');
const { PrismaClient } = require('@prisma/client')

const app = express();

app.engine('handlebars', handlebars.engine)
app.set('view engine', "handlebars")
app.use(express.static(__dirname + "/public"))


app.use(body_parser())
app.use("/movies", movies);

app.get("/", async (req, res) => {
    const movies = [
        {
            movie_name:"John Wick",
            thumbnial_path:"images/movies/after.jpg",
            released_year:"2012"
        },
        {
            movie_name:"Mr. Robot",
            thumbnial_path:"images/movies/Anna.jpg",
            released_year:"2020"
        },
        {
            movie_name:"After",
            thumbnial_path:"images/movies/Ashfall.jpg",
            released_year:"2021"
        },
        {
            movie_name:"Bleeding Steel",
            thumbnial_path:"images/movies/Bleeding.Steel.jpg",
            released_year:"2013"
        },
        {
            movie_name:"Blitz",
            thumbnial_path:"images/movies/Blitz.jpg",
            released_year:"2010"
        },
        {
            movie_name:"ባለ ራይዱ",
            thumbnial_path:"images/movies/ባለ ራይዱ.jpg",
            released_year:"2021"
        },
    ]

    let message='';

    try{
        const DBmovies = await prisma.movies.findMany();
        message = DBmovies.toString();
        console.log(message)
    }catch (e) {
        message = e;
    }
    res.render("index",{movies,message})
})

app.listen(3000, () => console.log("server is up and running"));

const prisma = new PrismaClient();

// console.log(prisma);

// prisma.Movies.create({
//         data: {
//             movie_name: "John Wick",
//         },
//     })
//     .then(inserted => {console.log(inserted)})
//     .catch(e => console.log(e))

// prisma.movies.findMany().then(movies=>{
//     console.log(movies.length)
// }).catch(e=>console.log(e))

// prisma.movies.deleteMany({
//     where:{
//         movie_name:'John Wick'
//     }
// }).then(deleted=>console.log(deleted))
//     .catch(error=>console.log(error))
