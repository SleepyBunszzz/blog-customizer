import clsx from 'clsx';
import { RefObject } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	isOpen: boolean;
	draft: ArticleStateType;
	onChange: (patch: Partial<ArticleStateType>) => void;
	onApply: () => void;
	onReset: () => void;
	onToggle: () => void;
	asideRef: RefObject<HTMLElement>;
};

export const ArticleParamsForm = ({
	isOpen,
	draft,
	onChange,
	onApply,
	onReset,
	onToggle,
	asideRef,
}: Props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				aria-hidden={!isOpen}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text>Настройки статьи</Text>

					<Separator />

					<Select
						title='Семейство шрифта'
						selected={draft.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(opt) => onChange({ fontFamilyOption: opt })}
					/>

					<Separator />

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={draft.fontSizeOption}
						options={fontSizeOptions}
						onChange={(opt) => onChange({ fontSizeOption: opt })}
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						selected={draft.fontColor}
						options={fontColors}
						onChange={(opt) => onChange({ fontColor: opt })}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={draft.backgroundColor}
						options={backgroundColors}
						onChange={(opt) => onChange({ backgroundColor: opt })}
					/>

					<Separator />

					<Select
						title='Ширина контента'
						selected={draft.contentWidth}
						options={contentWidthArr}
						onChange={(opt) => onChange({ contentWidth: opt })}
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
