const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');

// Testing
router.get('/test', (req, res) => {
	res.json({ message: 'It Works' });
});

// Register route
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			// User already exists
			return res.status(400).json({ email: 'Email slready exists' });
		} else {
			// Create new user
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then((user) => res.json(user)).catch((err) => console.log(err));
				});
			});
		}
	});
});

// Login route
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ email: 'User not found' });
		}
		// Check password
		const { id, name, email } = user;
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = { id: user.id, name: user.name };
				jwt.sign(payload, keys.secretOrKey, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
				});
			} else {
				res.status(400).json({ password: 'Password incorrect' });
			}
		});
	});
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;
