import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

export default async function ReservationsPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser)
		return <EmptyState title='Unauthorized' subtitle='Please login' />;

	const reservations = await getReservations({ authorId: currentUser.id });

	return reservations.length > 0 ? (
		<ReservationsClient
			currentUser={currentUser}
			reservations={reservations}
		/>
	) : (
		<EmptyState
			title='No reservations found'
			subtitle='Looks like you have no reservations on your properties'
		/>
	);
}
