'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

import Heading from '../Heading';
import useCountries from '@/app/hooks/useCountries';
import HeartButton from '../HeartButton';

type ListingHeadProps = {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: User | null;
};

export default function ListingHead(props: ListingHeadProps) {
	const { title, locationValue, imageSrc, id, currentUser } = props;
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>

			<div className='relative w-full h-[60vh] overflow-hidden rounded-xl'>
				<Image
					alt='Image'
					src={imageSrc}
					fill
					className='object-cover w-full'
				/>

				<div className='absolute top-5 right-5'>
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
}
