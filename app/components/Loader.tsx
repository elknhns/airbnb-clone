'use client';

import { PuffLoader } from 'react-spinners';

const Loader = () => (
	<div className='h-[70vh] flex justify-center items-center'>
		<PuffLoader size={100} color='red' />
	</div>
);

export default Loader;
