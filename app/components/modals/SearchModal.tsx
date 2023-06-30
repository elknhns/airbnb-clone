'use client';

import { formatISO } from 'date-fns';
import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import type { Listing } from '@prisma/client';
import type { Range } from 'react-date-range';
import type { SingleValue } from 'react-select';

import Body, { type BodyProps } from './Body';
import Calendar from '../inputs/Calendar';
import Counter, { type CounterProps } from '../inputs/Counter';
import CountrySelect, {
	type CountrySelectValue,
} from '../inputs/CountrySelect';
import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';

enum STEPS {
	LOCATION,
	DATE,
	INFO,
}

type Info = Pick<Listing, 'bathroomCount' | 'guestCount' | 'roomCount'>;

export default function SearchModal() {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [step, setStep] = useState(STEPS.LOCATION);
	const [info, setInfo] = useState<Info>({
		guestCount: 1,
		roomCount: 1,
		bathroomCount: 1,
	});
	const [location, setLocation] = useState<SingleValue<CountrySelectValue>>();
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const onBack = () => setStep((value) => value - 1);
	const onNext = () => setStep((value) => value + 1);

	const onSubmit = () => {
		if (step !== STEPS.INFO) return onNext();

		const query = {
			...qs.parse(params?.toString() ?? ''),
			locationValue: location?.value,
			...info,
			startDate: dateRange.startDate
				? formatISO(dateRange.startDate)
				: undefined,
			endDate: dateRange.endDate
				? formatISO(dateRange.endDate)
				: undefined,
		};

		const url = qs.stringifyUrl({ url: '/', query }, { skipNull: true });
		setStep(STEPS.LOCATION);
		searchModal.onClose();

		router.push(url);
	};

	const Map = useMemo(
		() => dynamic(() => import('../Map'), { ssr: false }),
		[location]
	);

	const locationBody = {
		heading: {
			title: 'Where do you wanna go?',
			subtitle: 'Find the perfect location!',
		},
		children: (
			<>
				<CountrySelect value={location} onChange={setLocation} />
				<hr />
				<Map center={location?.latlng} />
			</>
		),
	};

	const dateBody = {
		heading: {
			title: 'When do you plan to go?',
			subtitle: 'Make sure everyone is free!',
		},
		children: (
			<Calendar
				value={dateRange}
				onChange={(value) => setDateRange(value.selection)}
			/>
		),
	};

	const infoCounters: Array<
		Pick<CounterProps, 'title' | 'subtitle'> & {
			fieldName: keyof typeof info;
		}
	> = [
		{
			title: 'Guests',
			subtitle: 'How many guests are coming?',
			fieldName: 'guestCount',
		},
		{
			title: 'Rooms',
			subtitle: 'How many rooms do you need?',
			fieldName: 'roomCount',
		},
		{
			title: 'Bathrooms',
			subtitle: 'How many bathrooms do you need?',
			fieldName: 'bathroomCount',
		},
	];

	const infoBody = {
		heading: {
			title: 'More information',
			subtitle: 'Find your perfect place!',
		},
		children: infoCounters.map(({ fieldName, ...rest }) => (
			<Counter
				key={fieldName}
				{...rest}
				value={info[fieldName]}
				onChange={(value) =>
					setInfo((prev) => ({ ...prev, [fieldName]: value }))
				}
			/>
		)),
	};

	const stepBody: Record<STEPS, BodyProps> = {
		[STEPS.LOCATION]: locationBody,
		[STEPS.DATE]: dateBody,
		[STEPS.INFO]: infoBody,
	};

	const secondaryButton =
		step === STEPS.LOCATION
			? undefined
			: { label: 'Back', onClick: onBack };

	return (
		<Modal
			title='Filters'
			actionLabel={step === STEPS.INFO ? 'Search' : 'Next'}
			secondaryButton={secondaryButton}
			body={<Body {...stepBody[step]} />}
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
		/>
	);
}
