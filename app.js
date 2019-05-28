const express = require('express');
const app = express();
var bodyParser = require('body-parser')

const tableRouter=require('./router/tableRouter')
const userRouter=require('./router/userRouter')
const surveyRouter=require('./router/surveyRouter')
const SurveyRouterr=require('./router/SurveyRouterr')
const tourismRouter=require('./router/tourismRouter')
const adminRouter=require('./router/adminRouter')

const accountRouter=require('./router/accountRouter')


const mongoose = require('mongoose');
var upload = require('express-fileupload');
const PORT = process.env.PORT || 5000;
var cors = require('cors');


var server = require('http').Server(app);
app.use(cors({
  credentials: true,
}));
// app.use(bodyParser());

app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(
  // CheckFiles,
  (req, res,next) => {

next()
},express.static('public'), );


app.use(bodyParser.json())

app.use(express.json());

app.use(upload());
app.use(

  (req, res,next) => {

next()
},express.static('public'), );




// const MONGO_USERNAME = "readWriteUserTab3";
// const MONGO_PASSWORD = "tab3ya7lOm63Mk#$!)_-";
// const MONGO_HOSTNAME = '127.0.0.1';
// const MONGO_PORT = '27017';
// const MONGO_DB = "tab3";

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

// mongoose.connect(url, {useNewUrlParser: true});

mongoose.connect('mongodb://sundus:12345678er@ds261136.mlab.com:61136/data', {
  useNewUrlParser: true
});

// mongoose.connect('mongodb+srv://sunduskareem:V87QPKRO4YLkISSt@cluster0-ofvjs.mongodb.net/test?retryWrites=true', {
//   useNewUrlParser: true
// });
mongoose.connection.on('connected', () => {
  console.log('mongo has been connected...');
});

app.use('/api/v1/table',tableRouter)
app.use('/api/v1/usrs',userRouter)
app.use('/api/v1/survey',surveyRouter)
app.use('/api/v1/tourism',tourismRouter)
app.use('/api/v1/tourismsurvey',SurveyRouterr)
app.use('/api/v1/auth',accountRouter)
app.use('/api/v1/admin',adminRouter)


server.listen(PORT, () => {
  console.log('Running on port ' + PORT);
});
