var express = require('express');
var router = express.Router();
var User = require('../models/dataSchema');

router.post('/create', (req, res, next) => {
	var newUser = new User({
		username: req.body.username,
		maths: req.body.maths,
		physics: req.body.physics,
		chemistry: req.body.chemistry
	});
	newUser.save((err, user) => {
		if (err) {
			res.status(500).json({ errmsg: err });
		}
		res.status(200).json({ msg: user });
	});
});

router.get('/read', (req, res, next) => {
	User.find({}, (err, users) => {
		if (err) {
			res.status(500).json({ errmsg: err });
		}
		res.status(200).json({ msg: users });
	});
});

router.put('/update', (req, res, next) => {
	User.findById(req.body._id, (err, user) => {
		if (err) {
			res.status(500).json({ errmsg: err });
		}
		user.username = req.body.username;
		user.maths = req.body.maths;
		user.physics = req.body.physics;
		user.chemistry = req.body.chemistry;
		user.save((err, user) => {
		res.status(200).json({ msg: user });
		});
	});
});

router.delete('/delete/:id', (req, res, next) => {
	User.findOneAndRemove({ _id: req.params.id }, (err, user) => {
		if (err) {
			res.status(500).json({ errmsg: err });
		}
		res.status(200).json({ msg: user });
	});
});

module.exports = router;