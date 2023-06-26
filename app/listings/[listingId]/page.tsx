import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ListingClient from './ListingClient';

type ListingPageParams = { listingId?: string };

type Params = {
	params: ListingPageParams;
};

export default async function ListingPage({ params }: Params) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();

	return listing ? (
		<ListingClient listing={listing} currentUser={currentUser} />
	) : (
		<EmptyState />
	);
}
