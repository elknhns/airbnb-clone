import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export const POST = async (request: Request) => {
	const { password, ...rest } = await request.json();

	const user = await prisma.user.create({
		data: { ...rest, hashedPassword: await bcrypt.hash(password, 12) },
	});

	return NextResponse.json(user);
};
