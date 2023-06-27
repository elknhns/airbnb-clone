import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
	const currentUser = await getCurrentUser();
	if (!currentUser) return [];

	return await prisma.listing.findMany({
		where: { id: { in: currentUser.favoriteIds } },
	});
}
