'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { User } from '@prisma/client';

type HeartButtonProps = { listingId: string; currentUser?: User | null };

export default function HeartButton(props: HeartButtonProps) {
	const { listingId, currentUser } = props;
	const isLoved = true;
	const toggleFavorite = () => {};

	return (
		<div
			onClick={toggleFavorite}
			className='relative hover:opacity-80 transition cursor-pointer'
		>
			<AiOutlineHeart
				size={28}
				className='fill-white absolute -top-[2px] -right-[2px]'
			/>
			<AiFillHeart
				size={24}
				className={`${
					isLoved ? 'fill-rose-500' : 'fill-neutral-500/70'
				}`}
			/>
		</div>
	);
}
