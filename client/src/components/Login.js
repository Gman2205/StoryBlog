import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authAction';
import Alert from './Alert';

export class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: undefined
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		} else {
			this.setState({ errors: nextProps.errors }, () => setTimeout(() => this.setState({ errors: null }), 2000));
		}
	};

	onChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmitHandler = () => {
		const { email, password } = this.state;
		this.props.loginUser({ email, password });
	};
	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className="row" style={{ marginTop: '10rem' }}>
					<div className="col s12 m6 offset-m3">
						<div className="card" style={{ padding: '1rem' }}>
							{errors ? <Alert name={errors.email || errors.password} type="danger" /> : null}
							<div className="input-field col s12">
								<input
									name="email"
									type="email"
									value={this.state.email}
									onChange={this.onChangeHandler}
									className="validate"
								/>
								<label htmlFor="email">Email Address</label>
							</div>
							<div className="input-field col s12">
								<input
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.onChangeHandler}
									className="validate"
								/>
								<label htmlFor="password">Password</label>
							</div>

							<button
								className="btn light-blue waves-effect waves-light"
								type="submit"
								name="action"
								onClick={this.onSubmitHandler}
							>
								<i className="fas fa-sign-in-alt" /> Login
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
