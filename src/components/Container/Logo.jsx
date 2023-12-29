import React from 'react';
import logo from '../../assets/Logo.png';

function Logo({ width = '100px' }) {
	return (
		<div>
			<img
				src={logo}
				alt='logo'
				className='w-32'
			/>
		</div>
	);
}

export default Logo;
