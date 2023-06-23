'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

type ImageUploadProps = { value: string; onChange: (value: string) => void };

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
	const handleUpload = (result: { info: { secure_url: string } }) =>
		onChange(result.info.secure_url);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset='njdcacwi'
			options={{ maxFiles: 1 }}
		>
			{({ open }) => (
				<button
					className='relative cursor-pointer hover:opacity-70 transition border-2 border-dashed p-20 border-neutral-300 flex flex-col gap-4 items-center justify-center text-neutral-600'
					onClick={() => open()}
				>
					<TbPhotoPlus size={50} />

					<div className='font-semibold text-lg'>Click to upload</div>

					{value && (
						<div className='absolute inset-0 w-full h-full'>
							<Image
								src={value}
								alt='Upload'
								fill
								style={{ objectFit: 'cover' }}
							/>
						</div>
					)}
				</button>
			)}
		</CldUploadWidget>
	);
}
