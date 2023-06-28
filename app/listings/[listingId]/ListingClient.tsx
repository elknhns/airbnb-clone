'use client';

import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { Listing, Reservation, User } from '@prisma/client';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { categories } from '@/app/categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import useLoginModal from '@/app/hooks/useLoginModal';

type ListingClientProps = {
	listing: Listing & { user: User };
	currentUser: User | null;
	reservations?: Reservation[];
};

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

export default function ListingClient(props: ListingClientProps) {
	const { currentUser, listing, reservations = [] } = props;

	const loginModal = useLoginModal();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateReservation = async () => {
		if (!currentUser) return loginModal.onOpen();

		setIsLoading(true);

		try {
			await axios.post('/api/reservations', {
				totalPrice,
				listingId: listing.id,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
			});

			toast.success('Listing reserved!');
			setDateRange(initialDateRange);
			router.push('/trips')
			router.refresh();
		} catch {
			toast.error('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	const currentCategory = useMemo(
		() =>
			categories.find((category) => category.label === listing.category),
		[listing.category]
	);

	const disabledDates = useMemo(
		() =>
			reservations.reduce<Date[]>((prev, reservation) => {
				const range = eachDayOfInterval({
					start: new Date(reservation.startDate),
					end: new Date(reservation.endDate),
				});

				return [...prev, ...range];
			}, []),
		[reservations]
	);

	useEffect(() => {
		if (!dateRange.startDate || !dateRange.endDate) return;

		const dayCount = differenceInCalendarDays(
			dateRange.endDate,
			dateRange.startDate
		);

		setTotalPrice((dayCount || 1) * listing.price);
	}, [dateRange.startDate, dateRange.endDate, listing.price]);

	return (
		<Container>
			<div className='max-w-screen-lg mx-auto'>
				<div className='flex flex-col gap-6'>
					<ListingHead
						currentUser={currentUser}
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
					/>

					<div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
						<ListingInfo
							user={listing.user}
							category={currentCategory}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>

						<div className='order-first mb-10 md:order-last md:col-span-3'>
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								dateRange={dateRange}
								disabled={isLoading}
								disabledDates={disabledDates}
								onChangeDate={setDateRange}
								onSubmit={onCreateReservation}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
