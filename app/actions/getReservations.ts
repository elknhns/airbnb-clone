import prisma from '@/app/libs/prismadb';

type Params = { listingId?: string; userId?: string; authorId?: string };

const getReservations = ({ authorId, ...otherIds }: Params) =>
	prisma.reservation.findMany({
		where: {
			listing: authorId ? { userId: authorId } : undefined,
			...otherIds,
		},
		include: { listing: true },
		orderBy: { createdAt: 'desc' },
	});

export default getReservations;
