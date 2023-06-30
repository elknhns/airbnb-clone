'use client';

import { formatISO } from 'date-fns';
import { Range } from 'react-date-range';
import { ReactElement, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import qs from 'query-string';

import Body, { BodyProps } from './Body';
import Calendar from '../inputs/Calendar';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Heading from '../Heading';
import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import Counter, { CounterProps } from '../inputs/Counter';

enum STEPS {
	LOCATION,
	DATE,
	INFO,
}

export default function SearchModal() {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [step, setStep] = useState(STEPS.LOCATION);
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
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
			guestCount,
			roomCount,
			bathroomCount,
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

	const infoCounters: CounterProps[] = [
		{
			title: 'Guests',
			subtitle: 'How many guests are coming?',
			value: guestCount,
			onChange: setGuestCount,
		},
		{
			title: 'Rooms',
			subtitle: 'How many rooms do you need?',
			value: roomCount,
			onChange: setRoomCount,
		},
		{
			title: 'Bathrooms',
			subtitle: 'How many bathrooms do you need?',
			value: bathroomCount,
			onChange: setBathroomCount,
		},
	];

	const infoBody = {
		heading: {
			title: 'More information',
			subtitle: 'Find your perfect place!',
		},
		children: infoCounters.map((counter) => (
			<Counter key={counter.title} {...counter} />
		)),
	};

	const stepBody: Record<STEPS, BodyProps> = {
		[STEPS.LOCATION]: locationBody,
		[STEPS.DATE]: dateBody,
		[STEPS.INFO]: infoBody,
	};

	return (
		<Modal
			title='Filters'
			actionLabel={step === STEPS.INFO ? 'Search' : 'Next'}
			secondaryActionLabel={step === STEPS.LOCATION ? undefined : 'Back'}
			secondaryAction={onBack}
			body={<Body {...stepBody[step]} />}
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
		/>
	);
}
