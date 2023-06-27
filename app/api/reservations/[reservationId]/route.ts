import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

type Params = { reservationId?: string };

export const DELETE = async (
	request: Request,
	{ params: { reservationId } }: { params: Params }
) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return NextResponse.error();
	if (!reservationId) throw new Error('Invalid ID');

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [
				{ userId: currentUser.id },
				{ listing: { userId: currentUser.id } },
			],
		},
	});

	return NextResponse.json(reservation);
};
