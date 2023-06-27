'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import { useState } from 'react';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

type UserMenuProps = { currentUser?: User | null };

export default function UserMenu({ currentUser }: UserMenuProps) {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const onRent = () => {
		if (!currentUser) return loginModal.onOpen();

		rentModal.onOpen();
	};

	const guestMenus = (
		<>
			<MenuItem label='Login' onClick={loginModal.onOpen} />
			<MenuItem label='Sign Up' onClick={registerModal.onOpen} />
		</>
	);

	const loggedInMenus = (
		<>
			<MenuItem label='My trips' onClick={() => router.push('/trips')} />
			<MenuItem label='My favorites' onClick={() => {}} />

			<MenuItem
				label='My reservations'
				onClick={() => router.push('/reservations')}
			/>

			<MenuItem label='My properties' onClick={() => {}} />
			<MenuItem label='Airbnb my home' onClick={() => {}} />
			<MenuItem label='Logout' onClick={signOut} />
		</>
	);

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<button
					onClick={onRent}
					className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition'
				>
					Airbnb your home
				</button>

				<div
					onClick={() => setIsOpen((value) => !value)}
					className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
				>
					<AiOutlineMenu />

					<div className='hidden md:block'>
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>

			{isOpen && (
				<div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? loggedInMenus : guestMenus}
					</div>
				</div>
			)}
		</div>
	);
}
