const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	published: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Story = mongoose.model('stories', StorySchema);
