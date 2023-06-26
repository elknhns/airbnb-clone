'use client';

import { User } from '@prisma/client';

import { Category } from '../navbar/Categories';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { ssr: false });

type ListingInfoProps = {
	user: User | null;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	locationValue: string;
	category: Category | undefined;
};

export default function ListingInfo(props: ListingInfoProps) {
	const { getByValue } = useCountries();

	return (
		<div className='col-span-4 flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<div className='text-xl font-semibold flex items-center gap-2'>
					<div>Hosted by {props.user?.name}</div>
					<Avatar src={props.user?.image} />
				</div>

				<div className='flex items-center gap-4 font-light text-neutral-500'>
					<div>{props.guestCount} guests</div>
					<div>{props.roomCount} rooms</div>
					<div>{props.bathroomCount} bathrooms</div>
				</div>
			</div>

			<hr />

			{props.category && <ListingCategory {...props.category} />}

			<hr />

			<div className='text-lg font-light text-neutral-500'>
				{props.description}
			</div>

			<hr />

			<Map center={getByValue(props.locationValue)?.latlng} />
		</div>
	);
}
