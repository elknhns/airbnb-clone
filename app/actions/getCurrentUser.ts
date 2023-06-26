import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export const getSession = async () => await getServerSession(authOptions);

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) return null;

		return await prisma.user.findUnique({
			where: { email: session.user.email },
		});
	} catch {
		return null;
	}
}
