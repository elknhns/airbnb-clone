import Heading, { type HeadingProps } from '../Heading';

export type BodyProps = { children: React.ReactNode; heading: HeadingProps };

const Body = ({ children, heading }: BodyProps) => (
	<div className='flex flex-col gap-8'>
		<Heading {...heading} />
		{children}
	</div>
);

export default Body;
