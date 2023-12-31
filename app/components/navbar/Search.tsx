'use client';

import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get('locationValue');
	const startDate = params?.get('startDate');
	const endDate = params?.get('endDate');
	const guestCount = params?.get('guestCount');

	const getDurationLabel = () => {
		if (!startDate || !endDate) return 'Any Week';

		const start = new Date(startDate);
		const end = new Date(endDate);
		return `${differenceInDays(end, start) || 1} Days`;
	};

	const locationLabel = locationValue
		? getByValue(locationValue)?.label
		: 'Anywhere';

	const guestLabel = guestCount ? `${guestCount} Guests` : 'Add Guests';

	return (
		<div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
			<div
				onClick={searchModal.onOpen}
				className='flex flex-row items-center justify-between'
			>
				<div className='text-sm font-semibold px-6'>
					{locationLabel}
				</div>

				<div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
					{getDurationLabel()}
				</div>

				<div className='text-s pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
					<div className='hidden sm:block'>{guestLabel}</div>

					<div className='p-2 bg-rose-500 rounded-full text-white'>
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
