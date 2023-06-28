import prisma from '@/app/libs/prismadb';

export type GetListingsParams = {
	userId?: string;
	guestCount?: string;
	roomCount?: string;
	bathroomCount?: string;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
};

export default function getListings(params: GetListingsParams) {
	const { startDate, endDate, ...otherParams } = params;
	const { roomCount, guestCount, bathroomCount, ...rest } = otherParams;
	const { category, userId, locationValue } = rest;

	const query = {
		category,
		userId,
		locationValue,

		roomCount: roomCount ? { gte: Number(roomCount) } : undefined,
		guestCount: guestCount ? { gte: Number(guestCount) } : undefined,
		bathroomCount: bathroomCount
			? { gte: Number(bathroomCount) }
			: undefined,

		NOT: {
			reservations: {
				some: {
					OR: [
						{
							startDate: { lte: startDate },
							endDate: { gte: startDate },
						},
						{
							startDate: { lte: endDate },
							endDate: { gte: endDate },
						},
					],
				},
			},
		},
	};

	return prisma.listing.findMany({
		orderBy: { createdAt: 'desc' },
		where: query,
	});
}
