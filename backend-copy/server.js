import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import Pusher from 'pusher'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import fbpostSchema from './fbpostSchema.js';

Grid.mongo = mongoose.mongo

//app config
const app = express();
const port = process.env.PORT || 8000;

const pusher = new Pusher({
    appId: "1104825",
    key: "ac071da2a6fbb027c55a",
    secret: "dcfba62bba0f39c67ef1",
    cluster: "us2",
    useTLS: true
});

//middleware
app.use(bodyParser.json())
app.use(cors())

//db config

const connectionURL = "mongodb+srv://admin:vmiLMB1WOnPt2fFa@cluster0.srv0q.mongodb.net/facebookdb?retryWrites=true&w=majority";

//connect while uploading image
const conn = mongoose.createConnection(connectionURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//general connection
mongoose.connect(connectionURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log("General connection to db");

    //pusher stuff here
    const changeStream = mongoose.connection.collection('posts').watch();
    //anychange in data...
    changeStream.on('change', (change) => {
        if(change.operationType === 'insert'){
            pusher.trigger('posts', 'inserted',{
                change: change
            })
        }else if(change.operationType === 'update'){
            pusher.trigger('comments', 'newComment', {
                'change': change
            })
        }else{
            console.log("Error triggering pusher!")
        }
    })
})

let gridfs;

conn.once('open', () => {
    console.log("Connected to db to transfer photo")
    gridfs = Grid(conn.db, mongoose.mongo)
    gridfs.collection('images')
})

//store file upload in mongodb
const storage = new GridFsStorage({
    url: connectionURL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {{
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images' //line 48
            }
            resolve(fileInfo)
        }})
    }
})
//uploading file using 'multer' pkg of nodejs to mongodb using the setup "storage"
const upload = multer({storage})

//api routes
app.get('/', (req, res) => res.status(200).send('Hello world'))

//post upload image
app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.post('/upload/post', (req, res) => {
    const dbPost = req.body;
    fbpostSchema.create(dbPost, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post('/new/like', (req, res) => {
    const id = req.query.id;
    const newLike = req.body
    fbpostSchema.updateOne(
        {_id: id}, 
        {$push: {likes: newLike}},
        (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        }
    )
})
app.post('/new/comment', (req, res) => {
    const id = req.query.id;
    const newComment = req.body
    
    fbpostSchema.updateOne(
        {_id: id}, 
        {$push: {comments: newComment}},
        (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        }
    )
})
app.get('/retrieve/image/single', (req, res) => {
    gridfs.files.findOne({filename: req.query.name} , (err, file) => {
        if(err){
            res.status(500).send(err)
        }else{ 
            if(!file || file.length === 0){ 
                res.status(404).json({err: 'file not found'})
            }else{
                //which file do we find
                const readstream = gridfs.createReadStream(file.filename);
                readstream.pipe(res); //pass 
            }
        }
    })
})

app.get('/retrieve/posts', (req, res) => {
    fbpostSchema.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            data.sort((b,a) => {
                //sort and return baby
                return a.timestamp - b.timestamp;
            })
            res.status(200).send(data)
        }
    })
})

app.get('/get/allcomments', (req, res) => {
    const id = req.query.id
    fbpostSchema.find({_id: id}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`Listening to localhost: ${port}`))