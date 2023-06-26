import prisma from '@/app/libs/prismadb';

type Params = { listingId?: string };

const getListingById = ({ listingId }: Params) =>
	prisma.listing.findUnique({
		where: { id: listingId },
		include: { user: true },
	});

export default getListingById;
