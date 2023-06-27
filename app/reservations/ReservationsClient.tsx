'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

import Container from '../components/Container';
import Heading from '../components/Heading';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

type ReservationsClientProps = {
	reservations: Array<Reservation & { listing: Listing }>;
	currentUser: User | null;
};

export default function ReservationsClient(props: ReservationsClientProps) {
	const { reservations, currentUser } = props;
	const [idOnDelete, setIdOnDelete] = useState('');
	const router = useRouter();

	const onCancel = async (id: string) => {
		setIdOnDelete(id);

		try {
			await axios.delete(`/api/reservations/${id}`);
			toast.success('Reservation cancelled');
			router.refresh();
		} catch {
			toast.error('Something went wrong.');
		} finally {
			setIdOnDelete('');
		}
	};

	return (
		<Container>
			<Heading
				title='Reservations'
				subtitle='Bookings on your properties'
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
						actionLabel='Cancel guest reservation'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
