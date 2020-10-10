import React from 'react'
import axios from 'axios'
import Header from '../Components/Header'

export default class Configuration extends React.Component {

    productTypes = [
        "cpu", 
        "gpu", 
        "mobo", 
        "ram", 
        "psu", 
        "case", 
        "cooling", 
        "hdd", 
        "ssd"
    ]

    constructor(props){
        super(props)
        this.state = {
            fetchedData: [],
            inCart: [],
            search: [],
            phone: "",
            email: "",
            totalPrice: 0
        }
    }

    fetchData = async (productType) => {
        const response = await axios.get(`https://frag-builder.herokuapp.com/api/components/${productType}/${this.state.search}`)
        const data = []
        response.data.map(item => data.push(item))
        this.setState({ fetchedData: data })
    }

    handleSearch = (event, productType) => {
        this.setState({ search: event.target.value }, () => this.fetchData(productType))
    }

    handleEmail = event => {
        this.setState({ email: event.target.value })
    }

    handlePhone = event => {
        this.setState({ phone: event.target.value })
    }

    handleTotal = () => {
        let total = 0;
        this.state.inCart.map(item => total += item.price)
        this.setState({ total: total.toFixed(2) })
    }

    handleCart = (operation, product) => {
        const cart = this.state.inCart
        if (operation === "add") {
            cart.push(product)
            cart.concat(this.state.inCart)
            this.setState({ inCart: cart }, () => this.handleTotal())
        } else {
            const index = cart.indexOf(product)
            cart.splice(index, 1)
            this.setState({ inCart: cart }, () => this.handleTotal())
        }
    }

    sendOrder = async (event) => {
        event.preventDefault()
        const orderId = (Math.floor(1000000 + Math.random() * 9000000)).toString()
        const json = JSON.stringify({
            orderId: orderId,
            components: this.state.inCart.map(item => item.id).toString(),
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

    renderProducts = () => {
        return (
            <div className="overflow-auto">
                <div className="h-full w-full">
                    {this.state.fetchedData.map((item, key) => 
                        <div key={item+key} className="flex flex-col justify-between bg-white border border-gray-400 rounded shadow m-3 w-full sm:container mx-auto ">
                            <p className="font-open-sans">{item.model.toUpperCase()}</p>
                            <button 
                                className="bg-white hover:bg-indigo-300 hover:text-white text-gray-800 font-semibold w-110px py-2 px-4 border border-gray-300 rounded shadow" 
                                onClick={() => this.handleCart("add", item)}>
                            {item.price} EUR</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    renderCart = () => {
        return (
            <div className="overflow-auto">
                <div className="h-full w-full">
                    {this.state.inCart.map((item, key) => 
                        <div key={item+key} className="flex flex-row justify-between content-center bg-white border rounded shadow m-1 sm:container mx-auto">
                            <p className="self-center">{item.model.toUpperCase()}</p>
                            <button 
                                className="bg-white hover:bg-red-500 hover:text-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow"
                                onClick={() => this.handleCart("remove", item)}>x
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    renderInputFields = () => {
        return (
            <div>
                {this.productTypes.map((product, key) => 
                    <div key={product + key}>
                        <input 
                            className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full m-2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            name={product}
                            placeholder={product}
                            onChange={(event) => this.handleSearch(event, product)}
                        />
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="flex flex-row justify-center my-10">
                    <h1 className="lg:text-6xl md:text-3xl font-archivo">FRAG KONFIGURÁTOR</h1>
                </div>
                <div className="bg-gray-100 p-10">
                    <div className="flex flex-col lg:flex-row justify-between lg:h-big h-big sm:container mx-auto">
                        <div id="search"className="flex flex-col lg:w-1/3 m-1 bg-white max-h-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h2 className="font-open-sans text-lg text-black text-center">Vyhľadať komponent</h2>
                            <form className="">
                                {this.renderInputFields()}
                           </form>
                        </div>
                        
                        <div id="results" className="flex flex-col lg:w-1/3 m-1 bg-white max-h-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h2 className="font-open-sans text-lg text-black text-center">Výsledky vyhľadávania</h2>
                            {this.renderProducts()}
                        </div>

                        <div id="cart" className="flex flex-col lg:w-1/3 m-1 bg-white max-h-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h1 className="font-open-sans text-lg text-black text-center">Nákupný košík</h1>
                            <h2 className="font-open-sans text-center">Celkovo: {this.state.total} EUR</h2>
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <label className="font-open-sans block text-gray-700 text-sm font-bold my-2">E-mail</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    placeholder="e-mail"
                                    onChange={this.handleEmail}>
                                </input>
                                <label className="block text-gray-700 text-sm font-bold my-2">Telefónne číslo</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    placeholder="telefonne cislo"
                                    onChange={this.handlePhone}>
                                </input>
                                <button 
                                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-2"
                                    onClick={(event) => this.sendOrder(event, alert("Objednavka uspesne odoslana."))}>Odoslať objednávku
                                </button>
                            </form>
                            {this.renderCart()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}