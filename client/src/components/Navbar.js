import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authAction';

function Navbar(props) {
	const { isAuthenticated, user } = props.auth;
	if (isAuthenticated) {
		return (
			<nav className="light-blue lighten-3" role="navigation">
				<div className="nav-wrapper container">
					<Link id="logo-container" to="/" className="brand-logo">
						<i className="fa fa-book" /> StoryLine
					</Link>
					<ul className="right hide-on-med-and-down">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/stories">Stories</Link>
						</li>
						<li style={{ marginRight: 18 }}>
							<span style={{ color: '#000', fontSize: 22 }}>|</span>
						</li>
						<li>Hello {user.name}</li>
						<li>
							<Link to="/" onClick={() => props.logoutUser()}>
								Logout
							</Link>
						</li>
					</ul>
					<ul id="nav-mobile" className="side-nav">
						<li>
							<span style={{ color: '#000' }}>Hello {user.name}</span>
						</li>
						<li>
							<Link to="/stories">Stories</Link>
						</li>
						<li>
							<Link to="/" onClick={() => props.logoutUser()}>
								Logout
							</Link>
						</li>
					</ul>
					<Link to="/" data-activates="nav-mobile" className="button-collapse">
						<i className="fas fa-bars" />
					</Link>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="light-blue lighten-3" role="navigation">
				<div className="nav-wrapper container">
					<Link id="logo-container" to="/" className="brand-logo">
						<i className="fa fa-book" /> StoryLine
					</Link>
					<ul className="right hide-on-med-and-down">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/stories">Stories</Link>
						</li>
					</ul>

					<ul id="nav-mobile" className="side-nav">
						<li>
							<Link to="/stories">Stories</Link>
						</li>
					</ul>
					<Link to="/" data-activates="nav-mobile" className="button-collapse">
						<i className="fas fa-bars" />
					</Link>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
