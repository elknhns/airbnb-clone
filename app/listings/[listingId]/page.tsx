import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
import ListingClient from './ListingClient';

type ListingPageParams = { listingId?: string };

type Params = { params: ListingPageParams };

export default async function ListingPage({ params }: Params) {
	const listing = await getListingById(params);

	return listing ? (
		<ListingClient
			listing={listing}
			currentUser={await getCurrentUser()}
			reservations={await getReservations(params)}
		/>
	) : (
		<EmptyState />
	);
}
