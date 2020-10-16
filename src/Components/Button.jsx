import React from "react";

const Button = (props) => {

	return (
		<button
			className={`
				flex
				flex-row
				transition duration-300 ease-in-out
				my-10
				mx-5
				py-2
				px-4
				border-2
				border-${props.color}
				hover:bg-${props.color}
				text-black
				hover:text-white
				font-bold
				rounded-full
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