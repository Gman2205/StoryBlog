import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
	return (
		<div className="container">
			<h3>Welcome</h3>
			<p>This is a place where you can browes my stories</p>
			<Link to="/stories" className="btn light-blue">
				Go To Stories <i className="fas fa-book-reader" style={{ marginLeft: '5px' }} />
			</Link>
		</div>
	);
}

export default Home;
