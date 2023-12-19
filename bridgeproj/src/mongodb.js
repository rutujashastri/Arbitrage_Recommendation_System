
const mongoose = require("mongoose");

const dbURI = 'mongodb://127.0.0.1:27017/LoginForm'; 
const dbURIArbitrageData = 'mongodb://127.0.0.1:27017/ArbitrageData';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected to LoginForm database');
})
.catch((error) => {
  console.error('Failed to connect to LoginForm database:', error);
});

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

// Export the LogInCollection model for LoginForm database
module.exports = {
  LogInCollection,
};

// You can define other schemas and models here for the LoginForm database if needed

// Note: We are not creating a schema/model for the ArbitrageData collection here since it's an existing collection in the database.





// const mongoose=require("mongoose")

// const dbURI = 'mongodb://127.0.0.1:27017/LoginForm'; 
// const dbURIArbitrageData = 'mongodb://127.0.0.1:27017/ArbitrageData';
// mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected');
  
// })
// .catch((error) => {
//   console.error('Failed to connect to MongoDB:', error);
// });

// const logInSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// mongoose.connect(dbURIArbitrageData, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected');
  
// })
// .catch((error) => {
//   console.error('Failed to connect to MongoDB:', error);
// });
// const LogInCollection=new mongoose.model('LogInCollection',logInSchema)
// const ArbitrageDataCollection = mongoose.model('ArbitrageDataCollection', {}, 'ArbitrageData');

// module.exports = {
//   LogInCollection, // Export the 'LogInCollection' model for 'LoginForm' database
//   ArbitrageDataCollection, // Export the 'ArbitrageDataCollection' model for 'arbitragedata' database
// };
// //const mongoose = require('mongoose');
