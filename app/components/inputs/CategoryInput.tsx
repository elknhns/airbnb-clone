'use client';

import { IconType } from 'react-icons';
import classNames from 'classnames';

type CategoryInputProps = {
	icon: IconType;
	label: string;
	selected?: boolean;
	onClick: (value: string) => void;
};

export default function CategoryInput(props: CategoryInputProps) {
	const { icon: Icon, label, onClick, selected } = props;

	return (
		<div
			onClick={() => onClick(label)}
			className={classNames(
				'rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer',
				{
					'border-black': selected,
					'border-neutral-200': !selected,
				}
			)}
		>
			<Icon size={30} />

			<div className='font-semibold'>{label}</div>
		</div>
	);
}
