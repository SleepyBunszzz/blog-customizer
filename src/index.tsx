import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [applied, setApplied] = useState<ArticleStateType>(defaultArticleState);
	const [draft, setDraft] = useState<ArticleStateType>(defaultArticleState);

	const initialRef = useRef<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement>(null);

	const onToggle = () => setIsOpen((v) => !v);
	const onChangeDraft = (patch: Partial<ArticleStateType>) =>
		setDraft((prev) => ({ ...prev, ...patch }));

	const onApply = () => {
		setApplied(draft);
		setIsOpen(false);
	};

	const onReset = () => {
		const init = initialRef.current;
		setDraft(init);
		setApplied(init);
		setIsOpen(false);
	};

	// закрытие по клику вне
	useEffect(() => {
		if (!isOpen) return;
		const onDocDown = (e: PointerEvent) => {
			const t = e.target as Node;
			if (asideRef.current && !asideRef.current.contains(t)) setIsOpen(false);
		};
		document.addEventListener('pointerdown', onDocDown);
		return () => document.removeEventListener('pointerdown', onDocDown);
	}, [isOpen]);

	// закрытие по Esc
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [isOpen]);

	const cssVars = useMemo(
		() =>
			({
				'--font-family': applied.fontFamilyOption.value,
				'--font-size': applied.fontSizeOption.value,
				'--font-color': applied.fontColor.value,
				'--container-width': applied.contentWidth.value,
				'--bg-color': applied.backgroundColor.value,
			} as CSSProperties),
		[applied]
	);

	return (
		<main className={clsx(styles.main)} style={cssVars}>
			<ArticleParamsForm
				isOpen={isOpen}
				draft={draft}
				onChange={onChangeDraft}
				onApply={onApply}
				onReset={onReset}
				onToggle={onToggle}
				asideRef={asideRef}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
