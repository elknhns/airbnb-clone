'use client';

import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { usePathname, useSearchParams } from 'next/navigation';

import Container from '../Container';
import CategoryBox from '../CategoryBox';

type Category = Omit<Parameters<typeof CategoryBox>[0], 'selected'>;

export const categories: Category[] = [
	{ label: 'Beach', icon: TbBeach },
	{ label: 'Windmills', icon: GiWindmill },
	{ label: 'Modern', icon: MdOutlineVilla },
	{ label: 'Countryside', icon: TbMountain },
	{ label: 'Pools', icon: TbPool },
	{ label: 'Islands', icon: GiIsland },
	{ label: 'Lake', icon: GiBoatFishing },
	{ label: 'Skiing', icon: FaSkiing },
	{ label: 'Castles', icon: GiCastle },
	{ label: 'Camping', icon: GiForestCamp },
	{ label: 'Arctic', icon: BsSnow },
	{ label: 'Cave', icon: GiCaveEntrance },
	{ label: 'Desert', icon: GiCactus },
	{ label: 'Barns', icon: GiBarn },
	{ label: 'Lux', icon: IoDiamond },
];

export default function Categories() {
	const params = useSearchParams();
	const categoryParam = params?.get('category');

	return (
		usePathname() === '/' && (
			<Container>
				<div className='flex flex-row items-center justify-between overflow-x-auto pt-4'>
					{categories.map((category) => (
						<CategoryBox
							key={category.label}
							{...category}
							selected={categoryParam === category.label}
						/>
					))}
				</div>
			</Container>
		)
	);
}
