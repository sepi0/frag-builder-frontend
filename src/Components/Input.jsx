import React from "react";

const Input = (props) => {
	return (
		<input
			className={`
				shadow
				m-1
				p-1
				appearance-none
				bg-white
				border-none
				leading-tight
				focus:outline-none
			`}
			onChange={props.onChange}
			placeholder={props.placeholder}
		/>
	)
}

export default Input