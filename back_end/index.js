const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Get model
let User = require('./model/user');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});

const connection = 'mongodb://localhost:27017/test';
mongoose.set('useCreateIndex', true);
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => console.log('listening on *:3000' + server.address()));

// routes url
// registration
app.post('/registration', async function (req, res) {
   let { body } = req;
   let hash;
   try {
      let userExist = await User.findOne({ username: body.username });
      if (userExist !== null) return res.status(404).json({ message: 'User exists' });
      if (body.password) hash = await bcrypt.hash(body.password, 10);
      else return res.status(400).json({ message: 'User must have password' });

      let user = new User({ _id: mongoose.Types.ObjectId() });
      user.username = body.username;
      user.password = hash;
      if (body.role) user.role = body.role;

      await user.save();
      return res.json({ message: 'REGISTER_SUCCESS' });
   } catch (ex) {
      res.status(500).json({ message: 'Cannot connect Database' + ex });
   }
});

// login
app.post('/login', async function (req, res) {
   let { body } = req;
   try {
      let user = await User.findOne({ username: body.username });
      if (user === null) return res.status(404).json({ message: 'user not exist' });

      // console.log(user[0].password);
      bcrypt.compare(req.body.password, user.password, (err, result) => {
         if (err) return res.status(401).json({ message: 'user or password is not right' });

         if (result) {
            const token = jwt.sign(
               {
                  username: user.username,
                  role: user.role,
               },
               'AAAAASECRET',
               { expiresIn: '1d' }
            );
            return res.status(200).json({
               message: 'Auth successful',
               username: user.username,
               role: user.role,
               token: token,
            });
         }
      });
   } catch (ex) {
      res.status(500).json({ message: 'Cannot connect Database' + ex });
   }
});

module.exports = server;
