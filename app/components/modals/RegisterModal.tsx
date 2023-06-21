'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { FormInputContext } from '@/app/hooks/useFormInputContext';
import AuthForm from './AuthForm';
import Footer from './Footer';
import Modal from './Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const body = (
	<AuthForm
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
	/>
);

export default function RegisterModal() {
	const registerModal = useRegisterModal();
	const form = useForm<FieldValues>({
		defaultValues: { name: '', email: '', password: '' },
	});
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		try {
			await axios.post('/api/register', data);
			registerModal.onClose();
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setIsLoading(false);
		}
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
				isOpen={registerModal.isOpen}
				title='Register'
				actionLabel='Continue'
				onClose={registerModal.onClose}
				onSubmit={form.handleSubmit(onSubmit)}
				body={body}
				footer={<Footer />}
			/>
		</FormInputContext.Provider>
	);
}
