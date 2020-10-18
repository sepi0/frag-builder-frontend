import React from "react";
import Input from "./Input";

const OrderForm = (props) => {
	return (
		<div className=" self-center shadow bg-white text-carbon-500 font-mulish my-3 mx-auto w-full md:w-360p p-10">
			<div className="flex flex-col p-3">
				<div className="self-center border-carbon-500">
					<p>Meno</p>
					<Input onChange={props.onChangeName} placeholder="Prosím zadaj tvoje meno.."/>
				</div >
				<div className="self-center border-carbon-500">
					<p>Email</p>
					<Input onChange={props.onChangeEmail} placeholder="Prosím zadaj tvoj email.."/>
				</div>
				<div className="self-center border-carbon-500">
					<p>Telefon</p>
					<Input onChange={props.onChangePhone} placeholder="Prosím zadaj tvoje číslo.."/>
				</div>
				<div className="self-center py-3">
					{props.children}
				</div>
			</div>
		</div>
	)
}

export default OrderForm