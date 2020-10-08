import React from 'react'
import axios from 'axios'

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
        console.log(data)
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
        this.setState({ total: total })
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

    sendOrder = async (event, callback) => {
        event.preventDefault()
        const orderId = (Math.floor(1000000 + Math.random() * 9000000)).toString()
        const json = JSON.stringify({
            orderId: orderId,
            components: this.state.inCart.map(item => item.id).toString(),
            email: this.state.email,
            phone: this.state.phone
        })

        const response = await axios.post(
            `https://frag-builder.herokuapp.com/order/send`,
            json,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(response.data.data)
    }

    renderProducts = () => {
        const products =[]
        this.state.fetchedData.map(item => products.push(
            <div className="flex flex-row justify-between bg-white border border-gray-400 rounded shadow m-3 sm:container mx-auto">
                <p>{item.model.toUpperCase()}</p>
                <button 
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow" 
                    onClick={() => this.handleCart("add", item)}>{item.price} EUR</button>
            </div>
        ))
        return products
    }

    renderCart = () => {
        const cart = []
        this.state.inCart.map(item => cart.push(
            <div className="flex flex-row justify-between bg-white border border-gray-400 rounded shadow m-1 p-1 sm:container mx-auto">
                {item.model.toUpperCase()}
                <button 
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={() => this.handleCart("remove", item)}>X</button>
            </div>
        ))
        return cart
    }

    renderInputFields = () => {
        const inputFields = []
        this.productTypes.map((product, key) => {
            inputFields.push(
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    name={product}
                    placeholder={product}
                    key={key} 
                    onChange={(event) => this.handleSearch(event, product)}></input>
            )
        })
        return inputFields
    }

    render() {
        return (
            <div className="flex flex-row justify-between sm:container mx-auto h-500px">
                
                <div id="search"className="flex flex-col w-2/6	m-1">
                    <h2>hladat</h2>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {this.renderInputFields()}
                    </form>
                </div>
                
                <div id="results" className="flex flex-col w-2/6 overflow-auto m-1">
                    <h2>vysledok hladania</h2>
                    {this.renderProducts()}
                </div>

                <div id="cart" className="flex flex-col w-2/6 m-1">
                    <h1>kosik</h1>
                    <div className="flex flex-col self-center sm:container mx-auto">
                        {this.renderCart()}
                        <h2>celkovo: {this.state.total} EUR</h2>
                    </div>

                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <label>e-mail</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="e-mail"
                            onChange={this.handleEmail}></input>
                        <label>telefonne cislo</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="telefonne cislo"
                            onChange={this.handlePhone}></input>
                        <button 
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            onClick={(event) => this.sendOrder(event, alert("Objednavka uspesne odoslana."))}>odoslat objednavku</button>
                    </form>
                </div>
            </div>
        )
    }
}