import prisma from '@/app/libs/prismadb';

const getListing = () =>
	prisma.listing.findMany({
		orderBy: { createdAt: 'desc' },
	});

export default getListing;
