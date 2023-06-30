'use client';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { Listing, User } from '@prisma/client';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

type PropertiesClientProps = {
	listings: Listing[];
	currentUser: User | null;
};

export default function PropertiesClient(props: PropertiesClientProps) {
	const { listings, currentUser } = props;
	const [idOnDelete, setIdOnDelete] = useState('');
	const router = useRouter();

	const onCancel = async (id: string) => {
		setIdOnDelete(id);

		try {
			await axios.delete(`/api/listings/${id}`);
			toast.success('Listing deleted');
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
			<Heading title='Properties' subtitle='List of your properties' />

			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={idOnDelete === listing.id}
						currentUser={currentUser}
						actionLabel='Delete property'
					/>
				))}
			</div>
		</Container>
	);
}
