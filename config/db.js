const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/job-portal')
//   .then(() => console.log('DataBaseConnected!'));

const DB = 'mongodb+srv://shakyanischal:j7yvICvxCeXTT78O@cluster0.kfqbaqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(DB).then(()=>{
  console.log(`DB connection successful`);
}).catch((err)=> console.log(`DB connection error`, err));