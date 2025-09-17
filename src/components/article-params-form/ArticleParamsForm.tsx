import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	type ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useCloseOnOutsideClickOrEsc } from 'src/hooks/useCloseOnOutsideClickOrEsc';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (next: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const initialFormStateRef = useRef<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement>(null);

	const closeForm = () => setIsFormOpen(false);
	const toggleForm = () => setIsFormOpen((prev) => !prev);

	useEffect(() => {
		if (isFormOpen) {
			setFormState(currentArticleState);
		}
	}, [isFormOpen, currentArticleState]);

	useCloseOnOutsideClickOrEsc({
		isOpenElement: isFormOpen,
		elementRef: asideRef,
		onClose: closeForm,
	});

	const patchForm = (patch: Partial<ArticleStateType>) =>
		setFormState((prev) => ({ ...prev, ...patch }));

	const handleApply: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setCurrentArticleState(formState);
		closeForm();
	};

	const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const initial = initialFormStateRef.current;
		setFormState(initial);
		setCurrentArticleState(initial);
		closeForm();
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				aria-hidden={!isFormOpen}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text>Настройки статьи</Text>
					<Separator />

					<Select
						title='Семейство шрифта'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(opt) => patchForm({ fontFamilyOption: opt })}
					/>
					<Separator />

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(opt) => patchForm({ fontSizeOption: opt })}
					/>
					<Separator />

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(opt) => patchForm({ fontColor: opt })}
					/>
					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(opt) => patchForm({ backgroundColor: opt })}
					/>
					<Separator />

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(opt) => patchForm({ contentWidth: opt })}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
