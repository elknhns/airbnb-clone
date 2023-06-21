import { createContext, useContext } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type FormInputContext = {
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled: boolean;
};

export const FormInputContext = createContext<FormInputContext | undefined>(
	undefined
);

export const useFormInputContext = () => {
	const context = useContext(FormInputContext);
	if (!context)
		throw new Error('useFormState must be used within a FormStateProvider');

	return context;
};
