import React from 'react'
import axios from 'axios'
import Header from '../Components/Header'

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

    constructor(props){
        super(props)
        this.state = {
            fetchedData: [],
            inCart: [],
            search: [],
            phone: "",
            email: "",
            totalPrice: 0,
            browsing: "cpu"
        }
    }

    fetchData = async (productType) => {
        const response = await axios.get(`https://frag-builder.herokuapp.com/api/components/${productType}/${this.state.search}`)
        const data = []
        response.data.map(item => data.push(item))
        this.setState({ fetchedData: data })
    }

    handleBrowsing = productType => {
        this.setState({ browsing: productType })
    }

    handleSearch = event => {
        this.setState({ search: event.target.value }, () => this.fetchData(this.state.browsing))
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

    goBack = () => {
        this.setState({ browsing: "" })
        this.setState({ fetchedData: [] })
    }

    showProducts = () => {
        return (
            <div 
                id="vysledky"
                className="
                    grid 
                    grid-cols-2 
                    gap-4
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-6 
                    container
                    md:mx-auto
                    lg:mx-auto
                    xl:mx-auto
                    my-10">
                {this.state.fetchedData.map(item => 
                    <div 
                        className="
                            grid 
                            grid-col-1 
                            text-center 
                            p-10 
                            border-1 
                            shadow">
                        <h3>{item.model.toUpperCase()}</h3>
                        <div 
                            id="price-button"
                            className="
                                transition duration-300 ease-in-out
                                p-2 
                                border 
                                border-purple-600
                                rounded-full
                                hover:bg-purple-600
                                hover:text-white
                                cursor-pointer">
                            {item.price} EUR
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <div className="flex flex-col">
                <Header/>
                
                <div 
                    id="nadpis" 
                    className="
                        flex 
                        flex-row 
                        justify-center 
                        my-10">
                    <h1 
                        className="
                            lg:text-6xl 
                            md:text-3xl 
                            font-archivo">
                        KONFIGURÁTOR
                    </h1>
                </div>
                <div 
                    id="vyhladavanie"
                    className="
                        flex 
                        flex-col 
                        self-center">
                    <h1 className="text-center">Vyhladaj CPU</h1>
                    <input 
                        className="shadow"
                        onChange={this.handleSearch}>    
                    </input>
                    <h1 
                        className="
                            text-xl
                            md:text-2xl
                            lg:text-4xl
                            font-mulish
                        ">
                        VYBER SI PROCESOR
                    </h1>
                </div>

                {this.showProducts()}
                
                <div 
                    id="naspat-dalej"
                    className="
                        flex 
                        flex-row 
                        justify-center 
                        my-10">
                    <div className="
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-purple-600 
                        text-black 
                        hover:bg-purple-600 
                        hover:text-white 
                        cursor-pointer 
                        font-archivo 
                        rounded-full">
                        BACK
                    </div>
                    <div className="
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-purple-600 
                        text-black 
                        hover:bg-purple-600 
                        hover:text-white 
                        cursor-pointer 
                        font-archivo 
                        rounded-full">
                        NEXT
                    </div>
                </div>
            </div>
        )
    }
}