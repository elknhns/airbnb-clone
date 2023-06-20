'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

export default function LoginModal() {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const form = useForm<FieldValues>({
		defaultValues: { email: '', password: '' },
	});
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		const response = await signIn('credentials', {
			...data,
			redirect: false,
		});

		if (response?.ok) {
			toast.success('Logged in');
			router.refresh();
			loginModal.onClose();
		}

		if (response?.error) toast.error(response.error);

		setIsLoading(false);
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Welcome back'
				subtitle='Login to your account!'
				center
			/>

			<Input
				id='email'
				label='Email'
				type='email'
				disabled={isLoading}
				register={form.register}
				errors={form.formState.errors}
				required
			/>

			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				register={form.register}
				errors={form.formState.errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />

			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onClick={() => {}}
			/>

			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => {}}
			/>

			<div className='text-neutral-500 mt-4 font-light'>
				<div className='flex flex-row items-center justify-center gap-2'>
					<span>Already have an account?</span>

					<div
						onClick={registerModal.onClose}
						className='text-neutral-800 cursor-pointer hover:underline'
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={form.handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}
