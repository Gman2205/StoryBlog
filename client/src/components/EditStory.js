import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentStory, updateStory } from '../actions/storiesAction';
import CKEditor from 'react-ckeditor-component';

export class EditStory extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '', body: '', published: false };
		this.updateContent = this.updateContent.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { title, body, published } = nextProps.story;
		this.setState({ title, body, published });
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getCurrentStory(id);
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

	saveChangesHandler = (id, storyData) => {
		this.props.updateStory(id, storyData);
		this.props.history.push(`/stories/${id}`);
	};

	render() {
		const id = this.props.match.params.id;
		const { title, body, published } = this.state;
		let bodyTemp = body;
		return (
			<div className="container">
				<h1>Edit Story</h1>
				<div className="input-field" style={{ width: '50%', marginBottom: '2rem' }}>
					<input
						id="title"
						value={title ? title : ''}
						type="text"
						placeholder="Placeholder"
						onChange={this.onTextChange}
					/>
					<label htmlFor="title">Title</label>
				</div>
				<CKEditor
					activeClass="p10"
					content={bodyTemp}
					events={{
						blur: this.onBlur,
						afterPaste: this.afterPaste,
						change: this.updateContent
					}}
				/>
				<div className="switch" style={{ marginTop: '2rem' }}>
					<label>
						<input
							type="checkbox"
							value={this.state.published}
							checked={published ? published : false}
							onChange={this.onCheckboxChange}
						/>
						<span className="lever" />
						Publish
					</label>
				</div>
				<button
					style={{ marginTop: '2rem' }}
					onClick={() => this.saveChangesHandler(id, { title, body, published })}
					className="btn waves-effect waves-light light-blue lighten-2"
				>
					Save Changes
				</button>
				<div dangerouslySetInnerHTML={{ __html: this.state.body }} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	story: state.stories.currentStory
});

export default connect(mapStateToProps, { getCurrentStory, updateStory })(EditStory);
