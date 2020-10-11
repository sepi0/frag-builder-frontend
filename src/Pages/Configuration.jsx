import React from 'react'
import axios from 'axios'
import Header from '../Components/Header'

import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            browsing: this.productTypes[0],
            configuratorStep: 0,
            configuratorProgress: {
                0: "Základnú Dosku",
                1: "Procesor",
                2: "Grafickú kartu",
                3: "RAM-ky",
                4: "Zdroj",
                5: "SSD-čko",
                6: "HDD-čko",
                7: "Skrinku",
                8: "Chladenie",
            }
        }
    }

    handleProgress = (operation) => {
        let step = this.state.configuratorStep
        if (operation === "next") {
            this.flushData()
            step += 1
            this.setState({ configuratorStep: step })
        } else if (operation === "back") {
            this.flushData()
            step -= 1
            this.setState({ configuratorStep: step })
        }
    }

    flushData = () => {
        const data = []
        this.setState({ fetchedData: data })
    }

    fetchData = async (productType) => {
        const response = await axios.get(`https://frag-builder.herokuapp.com/api/components/${productType}/${this.state.search}`)
        const data = []
        response.data.map(item => data.push(item))
        this.setState({ fetchedData: data })
    }

    handleSearch = event => {
        this.setState({ search: event.target.value }, () => this.fetchData(this.productTypes[this.state.configuratorStep]))
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

    showProducts = () => {
        return (
            <div 
                id="vysledky"
                className="
                    self-center
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
                {this.state.fetchedData.map((item, key) => 
                    <div 
                        key={key}
                        className="
                            font-mulish
                            grid 
                            grid-col-1 
                            text-center 
                            p-10 
                            border-1 
                            shadow">
                        <h3>{item.model.toUpperCase()}</h3>
                        <div 
                            id="price-button"
                            onClick={() => this.handleCart("add", item)}
                            className="
                                transition duration-300 ease-in-out
                                p-2 
                                border 
                                border-purple-600
                                rounded-full
                                hover:bg-purple-600
                                hover:text-white
                                self-center
                                cursor-pointer">
                            {item.price} €
                        </div>
                    </div>
                )}
            </div>
        )
    }

    nextAndBackButtons = () => {
        return (
            <div 
                id="naspat-dalej"
                className="
                    flex 
                    flex-row 
                    justify-center 
                    font-mulish 
                    my-10">
                <div 
                    onClick={() => this.handleProgress("back")}
                    className="
                        flex
                        flex-row
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-purple-600 
                        text-black 
                        hover:bg-purple-600 
                        hover:text-white 
                        cursor-pointer  
                        rounded-full">
                    <FontAwesomeIcon className="mx-2 self-center" icon={faArrowLeft}/>
                    BACK
                </div>
                <div 
                    onClick={() => this.handleProgress("next")}
                    className="
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-purple-600 
                        text-black 
                        hover:bg-purple-600 
                        hover:text-white 
                        cursor-pointer 
                        rounded-full">
                    NEXT
                    <FontAwesomeIcon className="mx-2 self-center" icon={faArrowRight}/>
                </div>
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
                        ./KONFIGURÁTOR
                    </h1>
                </div>
                <div 
                    id="vyhladavanie"
                    className="
                        flex 
                        flex-col 
                        self-center">
                    <h1 className="text-center font-cairo">Vyhľadávanie</h1>
                    <div className="flex flex-row justify-center">
                        <FontAwesomeIcon className="self-center" icon={faSearch}></FontAwesomeIcon>
                        <input 
                            className="shadow m-3 p-1"
                            onChange={this.handleSearch}
                            placeholder="hľadať">    
                        </input>
                    </div>
                    <h1 
                        className="
                            text-xl
                            md:text-2xl
                            lg:text-4xl
                            font-mulish">
                        Vyber si {this.state.configuratorProgress[this.state.configuratorStep]}
                    </h1>
                </div>
                {this.showProducts()}
                {this.nextAndBackButtons()}
            </div>
        )
    }
}