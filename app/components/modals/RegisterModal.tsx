'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import AuthForm from './AuthForm';
import Footer from './Footer';
import Modal from './Modal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

export default function RegisterModal() {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const form = useForm<FieldValues>({
		defaultValues: { name: '', email: '', password: '' },
	});
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		try {
			await axios.post('/api/register', data);
			registerModal.onClose();
			loginModal.onOpen();
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	const moveToLogin = () => {
		registerModal.onClose();
		loginModal.onOpen();
	};

	const body = (
		<AuthForm
			disabled={isLoading}
			heading={{
				title: 'Welcome to Airbnb',
				subtitle: 'Create an account',
			}}
			inputs={[
				{ id: 'email', type: 'email', label: 'Email' },
				{ id: 'name', label: 'Name' },
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
			question='Already have an account?'
			actionLabel='Log in'
			onClick={moveToLogin}
		/>
	);

	return (
		<Modal
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={form.handleSubmit(onSubmit)}
			body={body}
			footer={footer}
			disabled={isLoading}
		/>
	);
}
