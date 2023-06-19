import { create } from 'zustand';

type RegisterModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export default create<RegisterModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
