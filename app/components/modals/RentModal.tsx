'use client';

import { Fragment, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { categories } from '@/app/categories';
import Body, { type BodyProps } from './Body';
import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import CountrySelect from '../inputs/CountrySelect';
import ImageUpload from '../inputs/ImageUpload';
import Input, { type InputProps } from '../inputs/Input';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE,
}

type IntrinsicInputProps = Pick<
	InputProps,
	'id' | 'label' | 'formatPrice' | 'type'
>;

export default function RentModal() {
	const rentModal = useRentModal();
	const router = useRouter();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

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

	const getInputElement = (props: IntrinsicInputProps) => (
		<Input
			{...props}
			disabled={isLoading}
			register={form.register}
			errors={form.formState.errors}
			required
		/>
	);

	const handleClick = (category: string) =>
		setCustomValue('category', category);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (step !== STEPS.PRICE) return onNext();

		setIsLoading(true);

		try {
			await axios.post('/api/listings', data);
			toast.success('Listing Created!');
			router.refresh();
			form.reset();
			setStep(STEPS.CATEGORY);
		} catch {
			toast.error('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	const selectedLocation = form.watch('location');
	const Map = useMemo(
		() => dynamic(() => import('../Map'), { ssr: false }),
		[selectedLocation]
	);

	const counters: { title: string; subtitle: string; fieldName: string }[] = [
		{
			title: 'Guests',
			subtitle: 'How many guests do you allow?',
			fieldName: 'guestCount',
		},
		{
			title: 'Rooms',
			subtitle: 'How many rooms do you have?',
			fieldName: 'roomCount',
		},
		{
			title: 'Bathrooms',
			subtitle: 'How many bathrooms do you have?',
			fieldName: 'bathroomCount',
		},
	];

	const categoryBody = {
		heading: {
			title: 'Which of these best describes your place?',
			subtitle: 'Pick a category',
		},
		children: (
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
		),
	};

	const locationBody = {
		heading: {
			title: 'Where is your place located?',
			subtitle: 'Help guests find you!',
		},
		children: (
			<div className='flex flex-col gap-8'>
				<CountrySelect
					value={selectedLocation}
					onChange={(value) => setCustomValue('location', value)}
				/>

				<Map center={selectedLocation?.latlng} />
			</div>
		),
	};

	const infoBody = {
		heading: {
			title: 'Share some basics about your place',
			subtitle: 'What amenities do you have?',
		},
		children: counters.map(({ fieldName, ...rest }, index) => (
			<Fragment key={fieldName}>
				{index !== 0 && <hr />}

				<Counter
					value={form.watch(fieldName)}
					onChange={(value) => setCustomValue(fieldName, value)}
					{...rest}
				/>
			</Fragment>
		)),
	};

	const imagesBody = {
		heading: {
			title: 'Add a photo of your place',
			subtitle: 'Show guests what your place looks like!',
		},
		children: (
			<ImageUpload
				value={form.watch('imageSrc')}
				onChange={(value) => setCustomValue('imageSrc', value)}
			/>
		),
	};

	const descriptionInputs: IntrinsicInputProps[] = [
		{ id: 'title', label: 'Title' },
		{ id: 'description', label: 'Description' },
	];

	const descriptionBody = {
		heading: {
			title: 'How would you describe your place',
			subtitle: 'Short and sweet works best!',
		},
		children: descriptionInputs.map((input, index) => (
			<Fragment key={input.id}>
				{index > 0 && <hr />}
				{getInputElement(input)}
			</Fragment>
		)),
	};

	const priceBody = {
		heading: {
			title: 'Now, set your price',
			subtitle: 'How much do you charge per night?',
		},
		children: getInputElement({
			id: 'price',
			label: 'Price',
			formatPrice: true,
			type: 'number',
		}),
	};

	const stepBody: Record<STEPS, BodyProps> = {
		[STEPS.CATEGORY]: categoryBody,
		[STEPS.LOCATION]: locationBody,
		[STEPS.INFO]: infoBody,
		[STEPS.IMAGES]: imagesBody,
		[STEPS.DESCRIPTION]: descriptionBody,
		[STEPS.PRICE]: priceBody,
	};

	const secondaryButton =
		step === STEPS.CATEGORY
			? undefined
			: { label: 'Back', onClick: onBack };

	return (
		<Modal
			title='Airbnb your home!'
			body={<Body {...stepBody[step]} />}
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={form.handleSubmit(onSubmit)}
			actionLabel={step === STEPS.PRICE ? 'Create' : 'Next'}
			secondaryButton={secondaryButton}
			disabled={isLoading}
		/>
	);
}
