'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FormInputContext } from '@/app/hooks/useFormInputContext';
import AuthForm from './AuthForm';
import Footer from './Footer';
import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';

const body = (
	<AuthForm
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
	/>
);

export default function LoginModal() {
	const router = useRouter();
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

	return (
		<FormInputContext.Provider
			value={{
				register: form.register,
				errors: form.formState.errors,
				disabled: isLoading,
			}}
		>
			<Modal
				isOpen={loginModal.isOpen}
				title='Login'
				actionLabel='Continue'
				onClose={loginModal.onClose}
				onSubmit={form.handleSubmit(onSubmit)}
				body={body}
				footer={<Footer />}
			/>
		</FormInputContext.Provider>
	);
}
