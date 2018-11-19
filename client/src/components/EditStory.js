import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentStory } from '../actions/storiesAction';
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

	render() {
		const id = this.props.match.params.id;
		const { title, body, published } = this.state;
		return (
			<div className="container">
				<h1>Edit Story</h1>
				<div className="input-field" style={{ width: '50%', marginBottom: '2rem' }}>
					<input id="title" value={title ? title : ''} type="text" onChange={this.onTextChange} />
					<label htmlFor="title">Title</label>
				</div>
				<CKEditor
					activeClass="p10"
					content={body}
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

				<div dangerouslySetInnerHTML={{ __html: this.state.body }} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	story: state.stories.currentStory
});

export default connect(mapStateToProps, { getCurrentStory })(EditStory);
