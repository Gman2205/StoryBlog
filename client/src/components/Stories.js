import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStories, getCurrentStory } from '../actions/storiesAction';
export class Stories extends Component {
	state = {
		stories: []
	};

	componentWillReceiveProps(nextProps) {
		this.setState({ stories: nextProps.stories.stories });
	}
	componentDidMount() {
		this.props.getStories();
	}
	render() {
		const stories = this.state.stories.map((book, i) => {
			return (
				<Link to={`/stories/${book._id}`} key={book._id}>
					<div className="col m3 s7 offset-s2 story">
						<h4>{book.title}</h4>
					</div>
				</Link>
			);
		});
		const { isAuthenticated } = this.props.auth;
		if (isAuthenticated) {
			return (
				<div className="container">
					<Link
						style={{ marginTop: '10px' }}
						className="waves-effect waves-light btn light-blue lighten-2"
						to="/stories/new"
					>
						Create New
					</Link>
					<div style={{ marginTop: '2rem', width: '100%' }} className="row">
						{stories}
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div style={{ marginTop: '2rem' }} className="row">
						{stories}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	stories: state.stories
});

export default connect(mapStateToProps, { getStories, getCurrentStory })(Stories);
