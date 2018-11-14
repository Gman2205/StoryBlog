import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from 'react-ckeditor-component';
import { connect } from 'react-redux';
import { createStory } from '../actions/storiesAction';

export class AddStory extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '', body: '', published: false };
		this.updateContent = this.updateContent.bind(this);
	}

	onCheckboxChange = () => {
		this.setState({ published: !this.state.published });
	};

	onTextChange = (e) => {
		this.setState({ title: e.target.value });
	};

	updateContent(evt) {
		var newContent = evt.editor.getData();
		this.setState({
			body: newContent
		});
	}

	onBlur(evt) {
		console.log('onBlur event called with event info: ', evt);
	}

	afterPaste(evt) {
		console.log('afterPaste event called with event info: ', evt);
	}

	onSubmitHandler = () => {
		const { title, body, published } = this.state;
		const newStory = published ? { title, body, published } : { title, body };
		this.props.createStory(newStory);
	};

	render() {
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push('/stories');
			return <div />;
		}
		return (
			<div className="container">
				<h1>Add Story</h1>
				<div className="input-field" style={{ width: '50%', marginBottom: '2rem' }}>
					<input id="title" type="text" onChange={this.onTextChange} />
					<label htmlFor="title">Title</label>
				</div>
				<CKEditor
					activeClass="p10"
					content={this.state.body}
					events={{
						blur: this.onBlur,
						afterPaste: this.afterPaste,
						change: this.updateContent
					}}
				/>
				<div className="switch" style={{ marginTop: '2rem' }}>
					<label>
						<input type="checkbox" checked={this.state.published} onChange={this.onCheckboxChange} />
						<span className="lever" />
						Publish
					</label>
				</div>

				<button
					style={{ marginTop: '2rem' }}
					className="btn waves-effect waves-light light-blue lighten-2"
					onClick={this.onSubmitHandler}
				>
					Create Story
				</button>

				<div dangerouslySetInnerHTML={{ __html: this.state.body }} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { createStory })(AddStory);
