'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo() {
	const router = useRouter();

	return (
		<Image
			src='/images/logo.png'
			alt='Airbnb logo'
			className='hidden md:block cursor-pointer'
			height={100}
			width={100}
		/>
	);
}
