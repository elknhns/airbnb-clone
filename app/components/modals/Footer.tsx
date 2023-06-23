import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { IconType } from 'react-icons';
import { signIn } from 'next-auth/react';

import Button from '../Button';

type FooterProps = {
	actionLabel: string;
	disabled: boolean;
	question: string;
	onClick: () => void;
};

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

export default function Footer({
	actionLabel,
	disabled,
	question,
	onClick,
}: FooterProps) {

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
					<span>{question}</span>

					<div
						onClick={onClick}
						className='text-neutral-800 cursor-pointer hover:underline'
					>
						{actionLabel}
					</div>
				</div>
			</div>
		</div>
	);
}
