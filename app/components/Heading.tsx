'use client';

import clsx from 'clsx';

export type HeadingProps = {
	title: string;
	subtitle?: string;
	center?: boolean;
};

const Heading = ({ title, subtitle, center }: HeadingProps) => (
	<div className={clsx(center && 'text-center')}>
		<div className='text-2xl font-bold'>{title}</div>
		<div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
	</div>
);

export default Heading;
