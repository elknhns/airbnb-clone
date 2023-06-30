'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite, { type UseFavoriteParams } from '../hooks/useFavorite';

export default function HeartButton(props: UseFavoriteParams) {
	const { isLiked, toggleFavorite } = useFavorite(props);

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
					isLiked ? 'fill-rose-500' : 'fill-neutral-500/70'
				}`}
			/>
		</div>
	);
}
