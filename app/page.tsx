import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getCurrentUser from './actions/getCurrentUser';
import getListing from './actions/getListings';
import ListingCard from './components/listings/ListingCard';

export default async function Home() {
	const listings = await getListing();
	const currentUser = await getCurrentUser();

	return (
		<Container>
			{listings.length === 0 ? (
				<EmptyState showReset />
			) : (
				<div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
					{listings.map((listing) => (
						<ListingCard
							key={listing.id}
							data={listing}
							currentUser={currentUser}
						/>
					))}
				</div>
			)}
		</Container>
	);
}
