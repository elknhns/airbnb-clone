'use client';

import { format } from 'date-fns';
import { Listing, Reservation, User } from '@prisma/client';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Button from '../Button';
import HeartButton from '../HeartButton';
import useCountries from '@/app/hooks/useCountries';

type ListingCardProps = {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: User | null;
};

const getReservationDate = (reservation?: Reservation) => {
	if (!reservation) return null;
	const start = new Date(reservation.startDate);
	const end = new Date(reservation.endDate);
	return `${format(start, 'PP')} - ${format(end, 'PP')}`;
};

export default function ListingCard(props: ListingCardProps) {
	const router = useRouter();
	const { getByValue } = useCountries();

	const handleCancel: MouseEventHandler = (e) => {
		e.stopPropagation();

		if (props.disabled) return;
		props.onAction?.(props.actionId ?? '');
	};

	const location = getByValue(props.data.locationValue);
	const price = props.reservation?.totalPrice ?? props.data.price;
	const reservationDate = getReservationDate(props.reservation);

	return (
		<div
			onClick={() => router.push(`/listings/${props.data.id}`)}
			className='col-span-1 cursor-pointer group'
		>
			<div className='flex flex-col gap-2 w-full'>
				<div className='aspect-square w-full relative overflow-hidden rounded-xl'>
					<Image
						alt='Listing'
						src={props.data.imageSrc}
						className='object-cover h-full w-full group-hover:scale-110 transition'
						fill
					/>

					<div className='absolute top-3 right-3'>
						<HeartButton
							listingId={props.data.id}
							currentUser={props.currentUser}
						/>
					</div>
				</div>

				<div className='font-semibold text-lg'>
					{location?.region}, {location?.label}
				</div>

				<div className='font-light text-neutral-500'>
					{reservationDate ?? props.data.category}
				</div>

				<div className='flex flex-row items-center gap-1'>
					<div className='font-semibold'>$ {price}</div>

					{!props.reservation && (
						<div className='font-light'>night</div>
					)}
				</div>

				{props.onAction && props.actionLabel && (
					<Button
						small
						disabled={props.disabled}
						label={props.actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
}
