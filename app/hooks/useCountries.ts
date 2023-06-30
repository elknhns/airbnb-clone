import countries from 'world-countries';

import type { CountrySelectValue } from '../components/inputs/CountrySelect';

const formattedCountries: CountrySelectValue[] = countries.map((country) => ({
	value: country.cca2,
	label: country.name.common,
	flag: country.flag,
	latlng: country.latlng,
	region: country.region,
}));

const useCountries = () => ({
	getAll: () => formattedCountries,

	getByValue: (value: string) =>
		formattedCountries.find((item) => item.value === value),
});

export default useCountries;
