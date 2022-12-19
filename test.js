const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost:27017/startbootstrap2', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// Create

BlogPost.create({
    title: 'dragon ball gt',
    body: 'le dessin animé db-gt a étè selon moi tres reussi'
}, (error, blogpost) => {
        console.log(error, blogpost)
});

// // Read

 BlogPost.find({}, (error, blogpost) => {
     console.log(error, blogpost)
 }) 

 BlogPost.find({
     title:/le dessin anime/
 }, (error, blogpost) => {
     console.log(error, blogpost)
 })

 var id = "6357e21fb32eb5d71cf76ef2"
 BlogPost.findById(id, (error, blogpost) => {
     console.log(error, blogpost)
})

// // Update

// var id = "6357e21fb32eb5d71cf76ef2"
// BlogPost.findByIdAndUpdate(id, {
//     title: 'Nouveau 3e livre'
// },
//     (error, blogpost) => {
//      console.log(error, blogpost)
// })

// // Delete

// BlogPost.deleteMany( (error, blogpost) => { // cela supprime tout le contenu de la collection
//     console.log(error, blogpost)
// })