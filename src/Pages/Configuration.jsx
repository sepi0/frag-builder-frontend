import React from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import {
	faArrowLeft,
	faArrowRight,
	faPollH,
	faSearch,
	faShoppingCart,
	faPaperPlane,
	faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button";
import Input from "../Components/Input";
import OrderForm from "../Components/OrderForm";

export default class Configuration extends React.Component {

	productTypes = [
		"mobo",
		"cpu",
		"gpu",
		"ram",
		"psu",
		"ssd",
		"hdd",
		"case",
		"cooling",
	]

	constructor(props) {
		super(props)
		this.state = {
			fetchedData: [],
			inCart: [],
			search: [],
			phone: "",
			email: "",
			name: "",
			totalPrice: 0,
			browsing: this.productTypes[0],
			configuratorStep: 0,
			configuratorProgress: {
				0: "Základné dosky",
				1: "Procesory",
				2: "Grafické karty",
				3: "RAM-ky",
				4: "Zdroje",
				5: "SSD-čka",
				6: "HDD-čka",
				7: "Skrinky",
				8: "Chladenia",
				9: "Výsledná zostava"
			},
		}
	}

	forwardProgress = () => {
		this.setState({
			configuratorStep: this.state.configuratorStep + 1
		})
	}

	backwardProgress = () => {
		this.setState({
			configuratorStep: this.state.configuratorStep - 1
		})
	}

	emptyData = () => {
		const data = []
		this.setState({ fetchedData: data })
	}
	
	fetchData = (productType) => {
		const self = this
		axios.get(`https://frag-builder.herokuapp.com/api/components/${productType}/${this.state.search}`)
			.then(function(res) {
				console.log(res.data)
				self.setState({ fetchedData: res.data })
			})
			.catch(function(err) {
				console.log(err)
			})
	}

	handleSearch = event => {
		this.setState({ search: event.target.value }, () => this.fetchData(this.productTypes[this.state.configuratorStep]))
	}

	handleEmail = event => {
		this.setState({ email: event.target.value })
	}

	handleName = event => {
		this.setState({ name: event.target.value })
	}

	handlePhone = event => {
		this.setState({ phone: event.target.value })
	}

	handleTotal = () => {
		let total = 0;
		this.state.inCart.map(item => total += item.price)
		this.setState({ totalPrice: total.toFixed(2) })
	}

	addToCart = (product) => {
		const cart = this.state.inCart
		cart.push(product)
		cart.concat(this.state.inCart)
		this.setState({
			inCart: cart
		}, this.handleTotal)
	}

	removeFromCart = (product) => {
		const cart = this.state.inCart
		const productIndex = cart.indexOf(product)
		cart.splice(productIndex, 1)
		this.setState({
			inCart: cart
		}, this.handleTotal)
	}

	sendOrder = async (event) => {
		event.preventDefault()

		const orderId = (Math.floor(1000000 + Math.random() * 9000000)).toString()
		const json = JSON.stringify({
			orderId: orderId,
			components: this.state.inCart.map(item => item.id).toString(),
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone
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

	orderForm = () => {
		if (this.state.configuratorStep === 9) {
			return (
				<OrderForm onChangeName={this.handleName} onChangeEmail={this.handleEmail} onChangePhone={this.handlePhone}>
					{this.orderButton()}
				</OrderForm>
			)
		}
	}

	finalConfiguration = () => {
		if (this.state.configuratorStep > 8) {
			return (
				<div className=" flex flex-col self-center container mx-auto">
					{this.state.inCart.map(item =>
						<div className=" flex flex-row justify-between p-3 m-1 w-full md:w-360p self-center border shadow bg-white font-mulish font-bold">
							<p className="self-center mx-2">{item.model.toUpperCase()}</p>
							<FontAwesomeIcon onClick={() => this.removeFromCart(item)} className=" text-red-500 self-center m-1 cursor-pointer text-sm" icon={faTimes} />
						</div>
					)}
				</div>
			)
		}
	}

	products = () => {
		if (this.state.configuratorStep < 9) {
			return (
				<div id="vysledky" className=" self-center grid  grid-cols-2  gap-4 md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5  container sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto my-10">
					{this.state.fetchedData.map((item, key) =>
						<div key={key} className="font-mulish flex flex-col justify-between text-center  p-10  bg-white border-1 shadow full">
							<h3>{item.model.toUpperCase()}</h3>
							<div className={"my-3 mx-auto"}>
								<Button className={"border-babyblue-500 hover:bg-babyblue-500"} onClick={() => this.addToCart(item)}>
									<FontAwesomeIcon className="mx-1 self-center" icon={faShoppingCart} />
									{item.price} €
								</Button>
							</div>
						</div>
					)}
				</div>
			)
		}
	}

	backButton = () => {
		if (this.state.configuratorStep > 0) {
			return (
				<Button
					className={"border-aquamarine-500 hover:bg-aquamarine-500"}
					onClick={this.backwardProgress}>
					<FontAwesomeIcon className="mx-2 self-center" icon={faArrowLeft} />
					<p>BACK</p>
				</Button>
			)
		}
	}

	nextButton = () => {
		if (this.state.configuratorStep < 8) {
			return (
				<Button
					className={"border-bubblegumred-500 hover:bg-bubblegumred-500"}
					onClick={this.forwardProgress}>
					<p>NEXT</p>
					<FontAwesomeIcon className="mx-2 self-center" icon={faArrowRight} />
				</Button>
			)
		}
	}

	resultButton = () => {
		if (this.state.configuratorStep === 8 && this.state.inCart.length !== 0) {
			return (
				<Button
					className={"border-bubblegumred-500 hover:bg-bubblegumred-500"}
					onClick={this.forwardProgress}>
					<p>VYSLEDNA ZOSTAVA</p>
					<FontAwesomeIcon className="mx-2 self-center" icon={faPollH} />
				</Button>
			)
		}
	}

	orderButton = () => {
		if (this.state.configuratorStep === 9) {
			return (
				<Button
					className={"border-bubblegumred-500 hover:bg-bubblegumred-500"}
					onClick={this.sendOrder}>
					<p>OBJEDNAŤ</p>
					<FontAwesomeIcon className="mx-2 self-center" icon={faPaperPlane} />
				</Button>
			)
		}
	}

	render() {
		return (
			<div>
				<Navbar />
				<div id="nadpis" className="flex  flex-row  justify-center h-360p bg-carbon-900 shadow-xl">
					<div className={"bg-tetris2 w-720p h-360p items-center"}>
						<h1 className="text-5xl sm:text-6xl text-center text-white font-archivo h-64">
							./KONFIGURÁTOR
						</h1>
					</div>
				</div>
				<div id="vyhladavanie" className="flex  flex-col  self-center">
					<h1 className="my-10 text-5xl text-center  text-carbon-500 font-archivo">
						VYHĽADÁVANIE
					</h1>
					<p className="text-center">Výsledky sa zobrazia do 10 sekúnd v prípade že backend nebeží.</p>
					<div className=" flex  flex-row  justify-center">
						<FontAwesomeIcon className="self-center" icon={faSearch}></FontAwesomeIcon>
						<Input
							onChange={this.handleSearch}
							placeholder="začni hľadať">
						</Input>
					</div>
					<h1 className=" text-center text-xl md:text-2xl lg:text-4xl py-5 font-mulish">
						{this.state.configuratorProgress[this.state.configuratorStep]}
					</h1>
					<p className=" font-bold font-mulish text-center">
						Ak chceš, môžeš si zvoliť viacero komponentov a na konci konfigurácie si ich povyhadzuješ z košíka..
					</p>
					<div className=" text-center text-carbon-500 text-2xl font-mulish font-bold">
						<h1>CELKOVO: {this.state.totalPrice}€</h1>
					</div>
					<div id="naspat-dalej" className=" flex  flex-row  justify-center  font-mulish">
						<div className={"mx-4 my-5"}>
							{this.backButton()}
						</div>
						<div className={"mx-4 my-5"}>
							{this.nextButton()}
							{this.resultButton()}
						</div>
					</div>
				</div>
				<div className="mx-auto overflow-y-scroll h-720p w-720p mb-10">
					{this.products()}
					{this.finalConfiguration()}
					<div>
						{this.orderForm()}
					</div>
				</div>
			</div>
		)
	}
}