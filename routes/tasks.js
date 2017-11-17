var express = require('express');
var router = express.Router();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var username = 'evan';
var password = 'onyem*interest5';

var mongoDBConnectionString = 'mongodb://' + username + ':' + password + '@cluster0-shard-00-00-s80cm.mongodb.net:27017,' +
        'cluster0-shard-00-01-s80cm.mongodb.net:27017,' + 'cluster0-shard-00-02-s80cm.mongodb.net:27017/taskList?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

MongoClient.connect(mongoDBConnectionString, function(err, db) {

		assert.equal(null, err);
		console.log("Successfully connected to MongoDB.");

		//Get tasks
		router.get('/tasks', function(req, res, next){
			db.collection('tasks').find({}).toArray(function(err, tasks){
				if (err){
					res.send(err);
				}
				res.json(tasks);
			}
		)})

		//Get single task
		router.get('/task/:id', function(req, res, next){
			db.collection('tasks').findOne({'_id': ObjectId(req.params.id)})
				.then(task => res.json(task))
					.catch(err => res.send(err));
		})

		//Save task
		router.post('/task', function(req, res, next){
			var task = req.body;
			if(!task.title || !(task.isDone + '')){
				res.status(400).send({ error: 'Bad Data' });
			}
			else{
				db.collection('tasks').insertOne(task)
						.then(() => res.json({msg: 'task added successfully'}))
							.catch(err => res.send(err));
			}
					
		})

		//Delete single task
		router.delete('/task/:id', function(req, res, next){
			db.collection('tasks').deleteOne({'_id': ObjectId(req.params.id)})
				.then(doc => res.json(doc))
					.catch(err => res.send(err));
		})

		//Update task
		router.put('/task/:id', function(req, res, next){
			var task = req.body;
			var updatedtask = {};
			if(task.title){
				updatedtask.title = task.title;
			}
			if(task.isDone){
				updatedtask.isDone = task.isDone;
			}
			if(!updatedtask){
				res.status(400).send({ error: 'Bad Data' });
			}
			else{
				db.collection('tasks').update({'_id': ObjectId(req.params.id)}, updatedtask)
						.then(task => res.json(task))
							.catch(err => res.send(err));
			}
					
		})
		


})


module.exports = router;




