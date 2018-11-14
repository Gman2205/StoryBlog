import React from 'react';

function Alert(props) {
	const types = {
		danger: {
			background: 'rgba(255,0,0,0.3)',
			text: '#dc3545'
		},
		success: {
			background: 'rgba(0,255,0,0.2)',
			text: '#28a745'
		}
	};

	const { name, type } = props;
	return (
		<div
			style={{
				width: '90%',
				background: types[type].background,
				margin: 'auto',
				padding: '1px',
				borderRadius: 4
			}}
		>
			<p style={{ color: types[type].text, textAlign: 'center' }}>{name}</p>
		</div>
	);
}

export default Alert;
