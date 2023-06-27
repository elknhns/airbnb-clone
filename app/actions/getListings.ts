import prisma from '@/app/libs/prismadb';

export type GetListingsParams = { userId?: string };

const getListings = ( params: GetListingsParams ) =>
	prisma.listing.findMany( {
		orderBy: { createdAt: 'desc' },
		where: params,
	} );

export default getListings;
