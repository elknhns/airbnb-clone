import { MouseEventHandler, useMemo } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import useLoginModal from './useLoginModal';

export type UseFavoriteParams = { listingId: string; currentUser?: User | null };

const useFavorite = ({ listingId, currentUser }: UseFavoriteParams) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const isLiked = useMemo(
		() => currentUser?.favoriteIds.includes(listingId),
		[listingId, currentUser?.favoriteIds]
	);

	const toggleFavorite: MouseEventHandler = async (e) => {
		e.stopPropagation();

		if (!currentUser) return loginModal.onOpen();

		try {
			await axios[isLiked ? 'delete' : 'post'](
				`/api/favorites/${listingId}`
			);
			router.refresh();
			toast.success('Success');
		} catch {
			toast.error('Something went wrong.');
		}
	};

	return { isLiked, toggleFavorite };
};

export default useFavorite;
