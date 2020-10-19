import React from "react";

const Button = (props) => {

	return (
		<button
			className={`
				${props.className}
				flex
				flex-row
				transition duration-300 ease-in-out
				py-2
				px-4
				border-2
				bg-white
				text-black
				hover:text-white
				font-bold
				rounded
				focus:outline-none
				cursor-pointer
			`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}

export default Button