'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type CalendarProps = {
	value: Range;
	onChange: (value: RangeKeyDict) => void;
	disabledDates?: Date[];
};

const Calendar = ({ value, onChange, disabledDates }: CalendarProps) => (
	<DateRange
		rangeColors={['hsl(0, 0%, 14.9%)']}
		ranges={[value]}
		date={new Date()}
		onChange={onChange}
		direction='vertical'
		showDateDisplay={false}
		minDate={new Date()}
		disabledDates={disabledDates}
	/>
);

export default Calendar;
