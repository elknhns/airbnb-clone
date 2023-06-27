import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

type Params = { listingId?: string };

export const DELETE = async (
	request: Request,
	{ params: { listingId } }: { params: Params }
) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	if (!listingId) throw new Error('Invalid ID');

	const listing = await prisma.listing.deleteMany({
		where: { id: listingId, userId: currentUser.id },
	});

	return NextResponse.json(listing);
};
