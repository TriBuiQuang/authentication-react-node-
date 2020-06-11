const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// routes
// const UserRoute = require ('./api/routes/UserRoute.js');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const connection = 'mongodb://localhost:27017/';
mongoose.connect(connection);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => console.log('listening on *:3000' + server.address()));
console.log('aa');

// routes url
// registration
app.post('/', function async (req, res) {
   let { body } = req;
   let userExist = User.findOne({ username: body.username });

   if (!userExist) return res.status(404).json({ success: false, message: 'User exists' });

   if (body.password) user.hash = bcrypt.hashSync(body.password, 10);
   else return res.status(400).json({ success: false, message: 'User must have password' });

   let user = new User({ _id: mongoose.Types.ObjectId() });
   user.username = body.username;
   user.pasword = user.hash;
   user.role = body.role;
   await user.save();

   return res.json({
      success: true,
      message: 'REGISTER_SUCCESS',
   });
});

// login
app.post('/', function async (req, res) {
   let { body } = req;
   let userExist = User.findOne({ username: body.username });

   if (!userExist) return res.status(404).json({ success: false, message: 'User exists' });

   if (body.password) user.hash = bcrypt.hashSync(body.password, 10);
   else return res.status(400).json({ success: false, message: 'User must have password' });
   
   return res.json({
      success: true,
      message: 'REGISTER_SUCCESS',
   });
});

module.exports = server;
