import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { IconType } from 'react-icons';
import { signIn } from 'next-auth/react';

import { useFormInputContext } from '@/app/hooks/useFormInputContext';
import Button from '../Button';
import useRegisterModal from '@/app/hooks/useRegisterModal';

type OAuthButton = {
	label: string;
	icon: IconType;
	provider: Parameters<typeof signIn>[0];
};

const buttons: OAuthButton[] = [
	{ label: 'Continue with Google', icon: FcGoogle, provider: 'google' },
	{
		label: 'Continue with Github',
		icon: AiFillGithub,
		provider: 'github',
	},
];

export default function Footer() {
	const registerModal = useRegisterModal();
	const { disabled } = useFormInputContext();

	return (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />

			{buttons.map(({ provider, ...rest }) => (
				<Button
					key={provider}
					outline
					disabled={disabled}
					onClick={() => signIn(provider)}
					{...rest}
				/>
			))}

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
}
