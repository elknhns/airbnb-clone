import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export const POST = async (request: Request) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const { listingId, ...reservationData } = await request.json();

	if (
		!listingId ||
		Object.values(reservationData).some((value) => value === '')
	)
		return NextResponse.error();

	const listingAndReservation = await prisma.listing.update({
		where: { id: listingId },
		data: {
			reservations: {
				create: { userId: currentUser.id, ...reservationData },
			},
		},
	});

	return NextResponse.json(listingAndReservation);
};
