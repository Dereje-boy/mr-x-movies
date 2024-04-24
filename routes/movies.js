const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const multer = require('multer')
const fs = require('fs')
const path = require('path')

const thumbnailsPath = "./public/thumbnails/";

const multerStorage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, thumbnailsPath)
    },
    filename: function (req, file, cb) {
        console.log('naming file');
        cb(null, nameThumbnail(file) )
    }
})
const upload = multer({storage:multerStorage});

const adminID = 210564;

router.get('/',(req, res)=>{
    console.log('welcome to get movies route');
    res.render('anim')
})

router.get('/search',async (req,res)=>{
    prisma.movies.findMany({
        where:{
            movie_name:{
                contains:'a'
            }
        }
    }).then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log('Error \n', error);
    })
    res.send("I have received your search...")
})

router.post('/',upload.single('thumbnail'), async (req,res)=>{
    console.log("body: ", req.body);

    let fileNewPath='',fileOldPath="";

    if (! addFailedGoBack(req, res)) return;

    try {
        fileOldPath = path.join(thumbnailsPath,thisFileName);
        fileNewPath = path.join(thumbnailsPath,
            req.body.movie_name + getUploadedFileExt());
        fs.rename(fileOldPath
            ,fileNewPath
            ,err => {console.log('rename error', err)})
    }catch (e) {
        console.log(e)
    }
    const {movie_name, released_year, country, single_or_series, storage_path, actors} = req.body;
    const ry = typeof parseInt(released_year)=== NaN ? 1900:parseInt(released_year)
    const s_or_s = checkS_or_S(single_or_series);
    prisma.movies.create({
        data:{
            movie_name,
            released_year:ry,
            country,
            single_or_series:s_or_s,
            thumbnail_name:movie_name+getUploadedFileExt(),
            storage_path
        }
    }).then(inserted=>console.log(inserted))
        .catch(e=>{console.log(e)}).finally(()=>{
        res.redirect('/')
        prisma.$disconnect()
    })

})

let thisFileName;

function addFailedGoBack(req, res) {
    if (! req.body.adminID){
        res.redirect('/')
        console.log('admin not found');
        return false;
    }
    if (typeof parseInt(req.body.adminID) !== "number"){
        res.redirect('/')
        console.log('admin id not a number');
        console.log(typeof parseInt(req.body.adminID));
        return false;
    }
    if (parseInt(req.body.adminID) !== adminID){
        res.redirect('/')
        console.log('admin id isnot correct');
        return false;
    }
    return true;
}

function nameThumbnail(file) {
    thisFileName = file.originalname;
    return thisFileName;
}

function getUploadedFileExt() {
    return thisFileName.slice(
        thisFileName.lastIndexOf('.'),
        thisFileName.length
    )
}

const checkS_or_S = (single_or_series) => {
    if (single_or_series.toUpperCase() === "SERIES") return "SERIES"
    if (single_or_series.toUpperCase() === "SINGLE_BUT_PARTS") return "SINGLE_BUT_PARTS"
    else return "SINGLE";
};

module.exports = router;