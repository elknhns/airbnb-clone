'use client';

import Link from 'next/link';

type MenuItemProps = { href?: string; label: string; onClick?: () => void };

const className = 'px-4 py-3 hover:bg-neutral-100 transition font-semibold';

const MenuItem = ({ href, label, onClick }: MenuItemProps) =>
	href ? (
		<Link href={href} className={className} onClick={onClick}>
			{label}
		</Link>
	) : (
		<div className={className} onClick={onClick}>
			{label}
		</div>
	);

export default MenuItem;
