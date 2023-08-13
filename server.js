const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/adminRoures')

const app = express();


app.enable('trust proxy');
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));
app.options('*', cors());
app.use(userRouter)

let DB = `Your DB Link`;
const password = 'Your Password';

DB = DB.replace('<password>', password);

// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connection Successful');
// }).catch((error) => {
//   console.error('Failed to connect to MongoDB:', error);
// });

mongoose.connect(DB,{}).then(()=>{
  console.log('Connection Successfull')
})

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter)

const PORT = 4008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
