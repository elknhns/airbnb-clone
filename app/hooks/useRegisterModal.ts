import { create } from 'zustand';

import { ModalStore } from './Modal.types';

export default create<ModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
