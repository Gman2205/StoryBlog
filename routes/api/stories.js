const express = require('express');
const router = express.Router();

const Story = require('../../models/Story');

// Get all stories
router.get('/', (req, res) => {
	Story.find().then((stories) => res.json(stories));
});

// get single story
router.get('/:id', (req, res) => {
	const id = req.params.id;
	Story.findById(id).then((story) => res.json(story)).catch((err) => console.log(err));
});

// Create new story
router.post('/', (req, res) => {
	const { title, body, published } = req.body;
	console.log(title, body, published);
	const newStory = new Story({
		title,
		body,
		published
	});
	newStory.save().then((story) => res.json(story)).catch((err) => res.status(400).json({ err }));
});

// Edit story
router.post('/:id', (req, res) => {
	const id = req.params.id;
	const { title, body, published } = req.body;
	Story.update({ _id: id }, { $set: { title, body, published } })
		.then((updStory) => {
			console.log(updStory);
			res.json(updStory);
		})
		.catch((err) => console.log(err));
});

// Delete Story
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Story.remove({ _id: id })
		.then(() => res.json({ msg: 'Story successfuly deleted' }))
		.catch((err) => console.log(err));
});
module.exports = router;
