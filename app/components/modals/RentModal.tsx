'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { ReactElement, useMemo, useState } from 'react';

import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Heading from '../Heading';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import dynamic from 'next/dynamic';

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE,
}

export default function RentModal() {
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);

	const form = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const onBack = () => setStep((value) => value - 1);
	const onNext = () => setStep((value) => value + 1);

	const setCustomValue = (id: string, value: unknown) =>
		form.setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});

	const handleClick = (category: string) =>
		setCustomValue('category', category);

	const selectedLocation = form.watch('location');
	const Map = useMemo(
		() => dynamic(() => import('../Map'), { ssr: false }),
		[selectedLocation]
	);

	const categoryBody = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Which of these best describes your place?'
				subtitle='Pick a category'
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
				{categories.map((category) => (
					<div key={category.label} className='col-span-1'>
						<CategoryInput
							selected={form.watch('category') === category.label}
							label={category.label}
							icon={category.icon}
							onClick={handleClick}
						/>
					</div>
				))}
			</div>
		</div>
	);

	const locationBody = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Where is your place located?'
				subtitle='Help guests find you!'
			/>

			<div className='flex flex-col gap-8'>
				<CountrySelect
					value={selectedLocation}
					onChange={(value) => setCustomValue('location', value)}
				/>
				<Map center={selectedLocation?.latlng} />
			</div>
		</div>
	);

	const stepBody: Record<STEPS, ReactElement> = {
		[STEPS.CATEGORY]: categoryBody,
		[STEPS.LOCATION]: locationBody,
	};

	return (
		<Modal
			title='Airbnb your home!'
			body={stepBody[step]}
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			actionLabel={step === STEPS.PRICE ? 'Create' : 'Next'}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			secondaryActionLabel={step === STEPS.CATEGORY ? undefined : 'Back'}
		/>
	);
}
