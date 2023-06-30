'use client';

import type {
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';
import Heading from '../Heading';
import Input, { type InputProps } from '../inputs/Input';

type BodyProps = {
	heading: { title: string; subtitle: string };
	inputs: Pick<InputProps, 'id' | 'type' | 'label'>[];
	disabled: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
};

const AuthForm = ({ heading, inputs, ...rest }: BodyProps) => (
	<div className='flex flex-col gap-4'>
		<Heading {...heading} center />

		{inputs.map((input) => (
			<Input key={input.id} {...input} {...rest} required />
		))}
	</div>
);

export default AuthForm;
