'use client';

import { IoMdClose } from 'react-icons/io';
import { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from '../Button';

type ModalProps = {
	onClose: () => void;
	onSubmit: () => void;
	actionLabel: string;
	isOpen?: boolean;
	title?: string;
	body?: ReactElement;
	footer?: ReactElement;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
	disabled?: boolean;
};

export default function Modal({
	actionLabel,
	body,
	disabled,
	footer,
	isOpen,
	onClose,
	onSubmit,
	secondaryAction,
	secondaryActionLabel,
	title,
}: ModalProps) {
	const [showModal, setShowModal] = useState(isOpen);

	const handleClose = () => {
		if (disabled) return;

		setShowModal(false);
		setTimeout(onClose, 300);
	};

	const handleSecondaryAction = () => disabled || secondaryAction?.();

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	return (
		isOpen && (
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
				<div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
					<div
						className={classNames('translate duration-300 h-full', {
							'translate-y-0 opacity-100': showModal,
							'translate-y-full opacity-0': !showModal,
						})}
					>
						<div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
							<div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
								<button
									onClick={handleClose}
									className='p-1 border-0 hover:opacity-70 transition absolute left-9'
								>
									<IoMdClose size={18} />
								</button>

								<div className='text-lg font-semibold'>
									{title}
								</div>
							</div>

							<div className='relative p-6 flex-auto'>{body}</div>

							<div className='flex flex-col gap-2 p-6'>
								<div className='flex flex-row items-center gap-4 w-full'>
									{secondaryAction &&
										secondaryActionLabel && (
											<Button
												outline
												label={secondaryActionLabel}
												disabled={disabled}
												onClick={handleSecondaryAction}
											/>
										)}

									<Button
										label={actionLabel}
										disabled={disabled}
										onClick={() => disabled || onSubmit()}
									/>
								</div>

								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}
