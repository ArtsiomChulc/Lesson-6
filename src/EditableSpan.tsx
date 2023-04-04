import React, { ChangeEvent, FC, useState } from 'react';

type EditableSpanPropsType = {
	title: string
	classes?: string
	changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({ title, classes, changeTitle }) => {

	const [valueInput, setValueInput] = useState<string>(title)

	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const onEditMode = () => {
		setIsEditMode(true)
	}
	const offEditMode = () => {
		changeTitle(valueInput)
		setIsEditMode(false)
	}

	const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.currentTarget.value)
	}


	return (
		isEditMode
			? <input onChange={setValueHandler} value={valueInput} onBlur={offEditMode} autoFocus />
			: <span onDoubleClick={onEditMode} className={classes}>{title}</span>
	)

}