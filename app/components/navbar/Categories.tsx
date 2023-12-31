'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/app/categories';
import Container from '../Container';
import CategoryBox from '../CategoryBox';

export default function Categories() {
	const params = useSearchParams();
	const categoryParam = params?.get('category');

	return (
		usePathname() === '/' && (
			<Container>
				<div className='flex flex-row items-center justify-between overflow-x-auto pt-4'>
					{categories.map((category) => (
						<CategoryBox
							key={category.label}
							{...category}
							selected={categoryParam === category.label}
						/>
					))}
				</div>
			</Container>
		)
	);
}
