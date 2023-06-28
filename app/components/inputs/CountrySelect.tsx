'use client';

import Select, { SingleValue } from 'react-select';

import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: [number, number];
	region: string;
	value: string;
};

export type CountrySelectProps = {
	value?: SingleValue<CountrySelectValue>;
	onChange: (value: SingleValue<CountrySelectValue>) => void;
};

const formatCountryOptionLabel = (option: CountrySelectValue) => (
	<div className='flex flex-row items-center gap-3'>
		<span>{option.flag}</span>

		<div>
			<span>{option.label},</span>

			<span className='text-neutral-500 ml-1'>{option.region}</span>
		</div>
	</div>
);

const selectClassNames = {
	control: () => 'p-3 border-2',
	input: () => 'text-lg',
	option: () => 'text-lg',
};

export default function CountrySelect(props: CountrySelectProps) {
	const { getAll } = useCountries();

	return (
		<div>
			<Select
				{...props}
				placeholder='Anywhere'
				options={getAll()}
				formatOptionLabel={formatCountryOptionLabel}
				classNames={selectClassNames}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: 'hsl(355.6, 100%, 94.7%)',
					},
				})}
				isClearable
			/>
		</div>
	);
}
