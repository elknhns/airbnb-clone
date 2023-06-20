'use client';

import Image from 'next/image';

const Logo = () => (
	<Image
		src='/images/logo.png'
		alt='Airbnb logo'
		className='hidden md:block cursor-pointer'
		height={100}
		width={100}
	/>
);

export default Logo;
