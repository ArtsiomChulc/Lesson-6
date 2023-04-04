import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
	addItem: (title: string) => void
	recommendedTitleLength: number
	maxTitleLength: number
}

export const AddItemForm: FC<AddItemFormPropsType> = ({ addItem, recommendedTitleLength, maxTitleLength }) => {

	const [title, setTitle] = useState<string>("")
	const [error, setError] = useState<boolean>(false)


	const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false)
		setTitle(e.currentTarget.value)
	}

	const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength || error

	const addTaskHandler = () => {
		const trimmedTitle = title.trim()
		if (trimmedTitle) {
			addItem(trimmedTitle)
		} else {
			setError(true)
		}
		setTitle("")
	}

	const onKeyDownAddTaskHandler = isAddTaskNotPossible
		? undefined
		: (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()


	const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
		<div style={{ color: "white" }}>Title should be shorter</div>
	const longTitleErrorMessage = title.length > maxTitleLength &&
		<div style={{ color: "#f23391" }}>Title is too long!!!</div>
	const errorMessage = error && <div style={{ color: "#f23391" }}>Title is hard required!</div>


	return (
		<div>
			<input
				placeholder="Enter task title, please"
				value={title}
				onChange={setLocalTitleHandler}
				onKeyDown={onKeyDownAddTaskHandler}
				className={error ? "input-error" : ""}
			/>
			<button
				disabled={isAddTaskNotPossible}
				onClick={addTaskHandler}
			>+
			</button>
			{longTitleWarningMessage}
			{longTitleErrorMessage}
			{errorMessage}
		</div>
	)

}