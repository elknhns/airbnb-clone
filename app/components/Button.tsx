import { IconType } from 'react-icons';
import { MouseEventHandler } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type ButtonProps = {
	label: string;
	onClick: MouseEventHandler;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
	href?: string;
};

export default function Button(props: ButtonProps) {
	const { icon: Icon, label, outline, small, href, ...rest } = props;

	const button = (
		<button
			className={classNames(
				'relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full',
				{
					'bg-white border-black text-black': outline,
					'bg-rose-500 border-rose-500 text-white': !outline,
					'py-1 text-sm font-light border-[1px]': small,
					'py-3 text-md font-semibold border-2': !small,
				}
			)}
			{...rest}
		>
			{Icon && <Icon size={24} className='absolute left-4 top-3' />}
			{label}
		</button>
	);

	return href ? <Link href={href}>{button}</Link> : button;
}
