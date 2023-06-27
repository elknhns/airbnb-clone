import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';

export default async function FavoritesPage() {
	const currentUser = await getCurrentUser();
	const listings = await getFavoriteListings();

	return listings.length > 0 ? (
		<FavoritesClient listings={listings} currentUser={currentUser} />
	) : (
		<EmptyState
			title='No favorites found'
			subtitle='Looks like you have no favorite listings'
		/>
	);
}
