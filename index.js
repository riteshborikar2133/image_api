const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const port = 8080
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
const UserModle = require('./model/Usermodel')

mongoose.connect('mongodb://localhost:27017/Images')


const  storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})


const upload = multer({
    storage:storage
})

app.post('/upload',upload.single('file'),async (req,res)=>{
    // console.log(req.file)
    // UserModle.create({name:req.body,image: req.file.filename})
    // .then(result => res.json(result))
    // .catch(err => console.log(err))
    const {name} = req.body;
    const image = req.file.filename;

    const newCategory = new UserModle({
      name,
      image
    });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully' });
})

app.get('/getimg', (req,res)=>{
    UserModle.find()
    .then(user=> res.json(user))
    .catch(err=>res.json(err))
})

// GET request to fetch a specific category by name
app.get('/categories/:name', async (req, res) => {
    try {
      const categoryName = req.params.name;
      const category = await UserModle.find({ name: categoryName });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})