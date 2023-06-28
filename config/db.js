const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/job-portal')
//   .then(() => console.log('DataBaseConnected!'));

const DB = 'mongodb+srv://shakyanischal:shakya@cluster0.kfqbaqo.mongodb.net/jobportal?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
  console.log(`connection successful`);
}).catch((err)=> console.log(`connection error`));