import * as React from 'react';

import logo from '../../images/contacts.png';
import './Header.css';

const Header = () => {
	return (
		<div className="header-container">
			<img
				src={logo}
				alt="Logo"
				width="50"
				height="50"
				style={{ cursor: 'pointer' }}
				onClick={() => (location.href = '/home')}
			/>
			<div className="header-top-left">
				Contact
				<br />
				Management
			</div>
		</div>
	);
};

export default Header;
