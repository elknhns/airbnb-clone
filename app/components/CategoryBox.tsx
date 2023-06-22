'use client';

import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import qs from 'query-string';

type CategoryBoxProps = {
	label: string;
	icon: IconType;
	selected: boolean;
};

export default function CategoryBox({
	icon: Icon,
	label,
	selected,
}: CategoryBoxProps) {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = () => {
		const currentQuery = params ? qs.parse(params.toString()) : {};
		const updatedQuery = {
			...currentQuery,
			category: params?.get('category') === label ? undefined : label,
		};

		const url = qs.stringifyUrl(
			{ url: '/', query: updatedQuery },
			{ skipNull: true }
		);

		router.push(url);
	};

	return (
		<div
			onClick={handleClick}
			className={classNames(
				'flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer',
				{ 'border-b-neutral-800 text-neutral-800': selected },
				{ 'border-transparent text-neutral-500': !selected }
			)}
		>
			<Icon size={26} />
			<div className='font-medium text-sm'>{label}</div>
		</div>
	);
}
