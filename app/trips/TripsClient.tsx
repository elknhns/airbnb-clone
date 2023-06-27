'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

type TripsClientProps = {
	reservations: Array<Reservation & { listing: Listing }>;
	currentUser: User | null;
};

export default function TripsClient(props: TripsClientProps) {
	const { reservations, currentUser } = props;
	const [idOnDelete, setIdOnDelete] = useState('');
	const router = useRouter();

	const onCancel = async (id: string) => {
		setIdOnDelete(id);

		try {
			axios.delete(`/api/reservations/${id}`);
			toast.success('Reservation cancelled');
			router.refresh();
		} catch (error) {
			if (error instanceof AxiosError)
				toast.error(error.response?.data.error);
		} finally {
			setIdOnDelete('');
		}
	};

	return (
		<Container>
			<Heading
				title='Trips'
				subtitle="Where you've been and where you're going"
			/>

			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={idOnDelete === reservation.id}
						currentUser={currentUser}
						actionLabel='Cancel reservation'
					/>
				))}
			</div>
		</Container>
	);
}
