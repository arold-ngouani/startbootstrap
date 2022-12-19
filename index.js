/*
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost')

const mongoose = require('mongoose');
const options = {
    connetTimeoutMS:5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect('mongodb://localhost:27017/startbootstrap',
options,
function(err){
    if (err){
        consoöe.error('erreur de connexion à mongoDB : ' +err);
    } else {
        console.log('connecté à la DB')
    }
});

const app = new express();

app.set('view engine', 'ejs');


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})



//app.get(('/'), (req, res) => {
//res.sendFile(path.resolve(__dirname, 'pages/index.html'))
//})
//app.get(('/about'), (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
//    })
// app.get(('/contact'), (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
// })
//app.get(('/post'), (req, res) => {
//      res.sendFile(path.resolve(__dirname, 'pages/post.html'))
// })

 
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/posts', (req, res) => {
    res.render('post');
})
app.get('/posts/new', (req, res) => {
    res.render('create');
})

// OPERATIONS C.R.U.D
// Create, Read, Update, Delete

app.post('/posts/store', (req, res) => {
    console.log(req.body)
    res.redirect('/');
})
*/


const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js');

// import ejs from 'ejs (ou express)' 

const mongoose = require('mongoose');

const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(
      'mongodb://localhost:27017/startbootstrap',
     options,        
     function(err){
       if(err){
      console.error('Erreur de connexion à mongoDB : '+err);
      } else {
        console.log('connecté à la DB')
      }
    }
  );


const app = new express();

app.set('view engine', 'ejs');


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/index.html'))
// })
// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/about.html'))
// })
// app.get('/contact', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
// })
// app.get('/posts', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'))
// })


//app.get('/', (req, res) => {
//    res.render('index');
//})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', async (req, res) => {
    const blogpost = await BlogPost.find({})
    res.render('post', {
        blogpost
    });
})
// app.get('/post', (req, res) => {
//    res.render('post');
//})

app.get('/posts/new', (req, res) => {
    res.render('create');
})


    
app.get('/', async (req, res) => {
    const blogpost = await BlogPost.find({})
    res.render('index', {
        blogpost
    });
})

app.get('/post/:id',async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
    blogpost
    })
    })

// OPERATIONS C.R.U.D
// Create, Read, Update, Delete

//app.post('/posts/store', (req, res) => {
//  BlogPost.create(req.body,(error, blogpost) =>{
//  console.log(req.body)
//  res.redirect('/');
//})
//})

app.post('/posts/store', (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img',image.name),
    async (error)=>{
    await BlogPost.create({...req.body,
         image: '/img/' + image.name})
    console.log(req.body)
    res.redirect('/')
 })
})

