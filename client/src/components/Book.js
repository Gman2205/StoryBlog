import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentStory, clearStory, deleteStory } from '../actions/storiesAction';

export class Book extends Component {
	componentWillMount() {
		const storyId = this.props.match.params.id;
		this.props.getCurrentStory(storyId);
	}
	componentWillUnmount() {
		this.props.clearStory();
	}

	onStoryDelete = (id) => {
		this.props.deleteStory(id);
		this.props.history.push('/stories');
	};

	render() {
		const { story } = this.props;
		const storyId = this.props.match.params.id;
		return (
			<div style={{ marginTop: '1rem' }} className="container single-story">
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
					<button
						onClick={() => this.props.history.push(`/stories/edit/${storyId}`)}
						className="btn light-blue"
					>
						Edit
					</button>
					<button onClick={this.onStoryDelete.bind(this, storyId)} className="btn red">
						Delete
					</button>
				</div>

				<h3>{story.title}</h3>
				<div dangerouslySetInnerHTML={{ __html: story.body }} className="story-content" />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	story: state.stories.currentStory
});

export default connect(mapStateToProps, { getCurrentStory, clearStory, deleteStory })(Book);
