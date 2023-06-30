'use client';

import { BiDollar } from 'react-icons/bi';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

export type InputProps = {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	required?: boolean;
};

const Input = ({
	id,
	required,
	label,
	type = 'text',
	disabled,
	formatPrice,
	register,
	errors,
}: InputProps) => (
	<div className='w-full relative'>
		{formatPrice && (
			<BiDollar
				size={24}
				className='text-neutral-700 absolute top-5 left-2'
			/>
		)}

		<input
			id={id}
			disabled={disabled}
			type={type}
			{...register(id, { required })}
			placeholder=' '
			className={clsx(
				'peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none',
				'transition disabled:opacity-70 disabled:cursor-not-allowed',
				formatPrice ? 'pl-9' : 'pl-4',
				errors[id]
					? 'border-rose-500 focus:border-rose-500'
					: 'border-neutral-300 focus:border-black'
			)}
		/>

		<label
			htmlFor={id}
			className={clsx(
				'absolute text-md duration-150 transform -translate-y-4 top-5 z-10 origin-[0] scale-75',
				'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
				formatPrice ? 'left-9' : 'left-4',
				errors[id] ? 'text-rose-500' : 'text-zinc-400'
			)}
		>
			{label}
		</label>
	</div>
);

export default Input;
