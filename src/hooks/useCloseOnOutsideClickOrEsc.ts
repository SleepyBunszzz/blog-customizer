import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEsc = {
	isOpenElement: boolean;
	elementRef: React.RefObject<HTMLElement>;
	onClose?: () => void;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpenElement,
	elementRef,
	onClose,
}: UseCloseOnOutsideClickOrEsc) => {
	useEffect(() => {
		if (!isOpenElement) return;

		const handleMouseDown = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (target && !elementRef.current?.contains(target)) {
				onClose?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpenElement, elementRef, onClose]);
};
