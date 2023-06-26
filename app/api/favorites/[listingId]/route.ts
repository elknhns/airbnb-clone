import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

type Params = { listingId?: string };

export const POST = async (
	request: Request,
	{ params: { listingId } }: { params: Params }
) => {
	if (!listingId) throw new Error('Invalid ID');

	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const user = await prisma.user.update({
		where: { id: currentUser.id },
		data: { favoriteIds: [...currentUser.favoriteIds, listingId] },
	});

	return NextResponse.json(user);
};

export const DELETE = async (
	request: Request,
	{ params: { listingId } }: { params: Params }
) => {
	if (!listingId) throw new Error('Invalid ID');

	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const user = await prisma.user.update({
		where: { id: currentUser.id },
		data: {
			favoriteIds: currentUser.favoriteIds.filter(
				(id) => id !== listingId
			),
		},
	});

	return NextResponse.json(user);
};
