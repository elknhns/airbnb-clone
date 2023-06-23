import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export const POST = async (request: Request) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return NextResponse.error();

	const { location, price, ...rest } = await request.json();

	const listing = await prisma.listing.create({
		data: {
			...rest,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
};
