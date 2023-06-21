import { useFormInputContext } from '@/app/hooks/useFormInputContext';
import Heading from '../Heading';
import Input, { InputProps } from '../inputs/Input';

type BodyProps = {
	heading: { title: string; subtitle: string };
	inputs: Pick<InputProps, 'id' | 'type' | 'label'>[];
};

export default function AuthForm({ heading, inputs }: BodyProps) {
	const { disabled } = useFormInputContext();

	return (
		<div className='flex flex-col gap-4'>
			<Heading {...heading} center />

			{inputs.map((input) => (
				<Input key={input.id} {...input} disabled={disabled} required />
			))}
		</div>
	);
}
