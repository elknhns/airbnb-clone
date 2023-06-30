import type { Category } from "@/app/categories";

const ListingCategory = ({ icon: Icon, label, description }: Category) => (
	<div className='flex items-center gap-4'>
		<Icon size={40} />

		<div>
			<div className='text-lg font-semibold'>{label}</div>
			<div className='text-neutral-500 font-light'>{description}</div>
		</div>
	</div>
);

export default ListingCategory;
