'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Logo = () => {
	const router = useRouter();

	return (
		<Image
			onClick={() => router.push('/')}
			src='/images/logo.png'
			alt='Airbnb logo'
			className='hidden md:block cursor-pointer'
			height={100}
			width={100}
		/>
	);
};

export default Logo;
