'use strict';
  const main = function () {
  /* eslint-disable no-console */
  const bodyParser = require('body-parser');
  const express = require('express');
  const expressValidator = require('express-validator');
  const router = express.Router()
  const Todo = require('./Todo');

  const app = express();
  app.use(bodyParser.json());
  app.use(expressValidator());
  const { body } = require('express-validator/check');
  // exports.validate = ((method) => {
  // 	switch (method) {
  // 	    case 'createUser': {
  // 	     return [ 
  // 	        body('userName', 'userName doesn\'t exist').exists(),
  // 	        body('email', 'Invalid email').exists().isEmail(),
  // 	        body('phone').optional().isInt(),
  // 	        body('status').optional().isIn(['enabled', 'disabled'])
  // 	       ]   
  // 	    }
  // 	  }
  // });

  app.use((req, res, next) => {
    res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
    res.setHeader('expires', '0');
    res.setHeader('pragma', 'no-cache');
    next();
  });

  app.get('/todos', (_, res) => {
    Todo.findAll().then((todos) => {
      res.send(todos);
    });
  });
  app.post('/todos', (req, res) => {
    Todo.create({ note: req.body.note })
      .then((todo) => {
        res.send(todo);
      });
  });
  app.delete('/todos/:id', (req, res) => {
    Todo.findById(req.params.id)
      .then(todo => todo.destroy())
      .then(() => res.send());
  });
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
};

module.exports = main;