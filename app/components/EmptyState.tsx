'use client';

import Button from './Button';
import Heading from './Heading';

type EmptyStateProps = {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
};

export default function EmptyState(props: EmptyStateProps) {
	const {
		showReset,
		title = 'No exact matches',
		subtitle = 'Try changing or removing some of your filters',
	} = props;

	return (
		<div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
			<Heading title={title} subtitle={subtitle} center />

			{showReset && (
				<Button
					href='/'
					outline
					label='Remove all filters'
					onClick={() => {}}
				/>
			)}
		</div>
	);
}
