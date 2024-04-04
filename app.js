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
    res.render("index");
})

app.listen(3000, () => console.log("server is up and running"));

const prisma = new PrismaClient();

// console.log(prisma);

// prisma.Movies.create({
//     data: {
//         movie_name: "John Wick"
//     }
// }).then(inserted => console.log(inserted))
//     .catch(e => console.log(e))

// prisma.movies.findMany().then(movies=>{
//     console.log(movies)
// })