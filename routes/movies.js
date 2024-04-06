const express = require('express');
const router = express.Router();


const { PrismaClient } = require('@prisma/client')

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

router.post('/',upload.single('thumbnail'), async (req,res)=>{
    console.log("body: ", req.body);

    const fileOldPath = path.join(thumbnailsPath,thisFileName);
    const fileNewPath = path.join(thumbnailsPath,
        req.body.movie_name + getFileExt(thisFileName));

    const prisma = new PrismaClient();
    const {movie_name, released_year, country, single_or_series, storage_path, actors} = req.body;
    const ry = typeof parseInt(released_year)=== NaN ? 1900:parseInt(released_year)
    const s_or_s = checkS_or_S(single_or_series);
    const actrs = actors.split(',')
    console.log('actors',actrs);
    prisma.movies.create({
        data:{
            movie_name,
            released_year:ry,
            country,
            single_or_series:s_or_s,
            thumbnail_name:fileNewPath,
            storage_path,
            actors:{
                create:[
                    {
                        fullname:actrs[0]
                    },{
                        fullname:actrs[1]
                    },{
                        fullname:actrs[2]
                    }
                ]
            }
        },
        include: {
            actors:true
        }
    }).then(inserted=>console.log(inserted))
        .catch(e=>{console.log(e)})

    fs.rename(fileOldPath
        ,fileNewPath
        ,err => {console.log('rename error', err)})
    res.redirect('/')
})

let thisFileName;

function nameThumbnail(file) {
    thisFileName = file.originalname;
    return thisFileName;
}

function getFileExt(filename) {
    return filename.slice(
        filename.lastIndexOf('.'),
        filename.length
    )
}

const checkS_or_S = (single_or_series) => {
    if (single_or_series.toUpperCase() === "SERIES") return "SERIES"
    if (single_or_series.toUpperCase() === "SINGLE_BUT_PARTS") return "SINGLE_BUT_PARTS"
    else return "SINGLE";
};

module.exports = router;