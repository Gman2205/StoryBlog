import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentStory } from '../actions/storiesAction';

export class Book extends Component {
	componentDidMount() {
		const storyId = this.props.match.params.id;
		this.props.getCurrentStory(storyId);
	}
	render() {
		const storyId = this.props.match.params.id;
		const { story } = this.props;
		return (
			<div className="container">
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
					<button className="btn light-blue" style={{}}>
						Edit
					</button>
					<button className="btn red" style={{}}>
						Delete
					</button>
				</div>

				<h1>{story.title}</h1>
				<p>{story.body}</p>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	story: state.stories.currentStory
});

export default connect(mapStateToProps, { getCurrentStory })(Book);
