import type { Range } from 'react-date-range';

import Calendar from '../inputs/Calendar';
import Button from '../Button';

type ListingReservationProps = {
	price: number;
	dateRange: Range;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabled?: boolean;
	disabledDates: Date[];
};

const ListingReservation = (props: ListingReservationProps) => (
	<div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
		<div className='flex items-center gap-1 p-4'>
			<span className='text-2xl font-semibold'>$ {props.price}</span>
			<span className='font-light text-neutral-600'>night</span>
		</div>

		<hr />

		<Calendar
			value={props.dateRange}
			disabledDates={props.disabledDates}
			onChange={(value) => props.onChangeDate(value.selection)}
		/>

		<hr />

		<div className='p-4'>
			<Button
				disabled={props.disabled}
				label='Reserve'
				onClick={props.onSubmit}
			/>
		</div>

		<div className='p-4 flex items-center justify-between font-semibold text-lg'>
			<span>Total</span>
			<span>$ {props.totalPrice}</span>
		</div>
	</div>
);

export default ListingReservation;
