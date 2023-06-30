'use client';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthForm from './AuthForm';
import Footer from './Footer';
import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

export default function LoginModal() {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
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

	const moveToRegister = () => {
		loginModal.onClose();
		registerModal.onOpen();
	};

	const body = (
		<AuthForm
			disabled={isLoading}
			heading={{
				title: 'Welcome back',
				subtitle: 'Login to your account!',
			}}
			inputs={[
				{ id: 'email', type: 'email', label: 'Email' },
				{
					id: 'password',
					type: 'password',
					label: 'Password',
				},
			]}
			register={form.register}
			errors={form.formState.errors}
		/>
	);

	const footer = (
		<Footer
			disabled={isLoading}
			question='First time using Airbnb?'
			actionLabel='Create an account'
			onClick={moveToRegister}
		/>
	);

	return (
		<Modal
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={form.handleSubmit(onSubmit)}
			body={body}
			footer={footer}
			disabled={isLoading}
		/>
	);
}
