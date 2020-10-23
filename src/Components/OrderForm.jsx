import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React from "react";
import { useState } from "react";
import Button from './Button';
import Input from "./Input";

const OrderForm = (props) => {
	const [username, setUsername] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");

	async function sendOrder(e) {
		e.preventDefault();
		const orderId = (Math.floor(1000000 + Math.random() * 9000000)).toString();
		const json = JSON.stringify({
			orderId: orderId,
			components: props.components,
			name: username,
			email: email,
			phone: phone
		})

		await axios.post(
			`https://frag-builder.herokuapp.com/order/send`,
			json,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}

	return (
		<div className=" self-center shadow bg-white text-carbon-500 font-mulish my-3 mx-auto w-full md:w-360p p-10">
			<div className="flex flex-col p-3">
				<div className="self-center border-carbon-500">
					<p>Meno</p>
					<Input onChange={e => setUsername(e.target.value)} placeholder="Prosím zadaj tvoje meno.." type="text"/>
				</div >
				<div className="self-center border-carbon-500">
					<p>Email</p>
					<Input onChange={e => setEmail(e.target.value)} placeholder="Prosím zadaj tvoj email.." type="email"/>
				</div>
				<div className="self-center border-carbon-500">
					<p>Telefon</p>
					<Input onChange={e => setPhone(e.target.value)} placeholder="Prosím zadaj tvoje číslo.."/>
				</div>
				<div className="self-center py-3">
					<Button
						className={"border-bubblegumred-500 hover:bg-bubblegumred-500"}
						onClick={sendOrder}>
						<p>OBJEDNAŤ</p>
						<FontAwesomeIcon className="mx-2 self-center" icon={faPaperPlane} />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default OrderForm;