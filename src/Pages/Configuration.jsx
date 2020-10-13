import React from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import { faArrowLeft, faArrowRight, faPollH, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
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
                9: "Výsledná zostava"
            },
            isOnFirstStep: true,
            isOnLastStep: false,
        }
    }

    handleProgress = (operation) => {
        let step = this.state.configuratorStep
        if (operation === "next" || operation === "result") {
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
        this.setState({ totalPrice: total.toFixed(2) })
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

    showFinalConfiguration = () => {
        if (this.state.configuratorStep > 8) {
            return (
                <div 
                    className="
                        flex
                        flex-col
                        self-center
                        w-big
                        container
                        md:mx-auto
                        lg:mx-auto
                        xl:mx-auto">
                    {this.state.inCart.map(item => 
                        <div
                            className="
                                flex
                                flex-row
                                justify-between
                                p-3
                                m-1
                                w-1/3
                                self-center
                                border
                                shadow
                                font-mulish
                                font-bold">
                            <p className="self-center mx-2">{item.model.toUpperCase()}</p>
                            <div 
                                onClick={() => this.handleCart("remove", item)}
                                className="
                                    self-center
                                    text-center
                                    bg-red-500
                                    w-12
                                    h-12
                                    py-1
                                    px-2
                                    m-1
                                    cursor-pointer
                                    text-white
                                    hover:text-black">
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }

    showProducts = () => {
        if (this.state.configuratorStep < 9) {
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
                                bg-white
                                border-1 
                                shadow full">
                            <h3>{item.model.toUpperCase()}</h3>
                            <div 
                                id="price-button"
                                onClick={() => this.handleCart("add", item)}
                                className="
                                    transition duration-300 ease-in-out
                                    p-2 
                                    border 
                                    border-aquamarine-300
                                    rounded-full
                                    hover:bg-aquamarine-300
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
    }

    backButton = () => {
        if (this.state.configuratorStep > 0) {
            return (
                <div 
                    onClick={() => this.handleProgress("back")}
                    className="
                        flex
                        flex-row
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-aquamarine-500 
                        text-black 
                        hover:bg-aquamarine-500 
                        hover:text-white 
                        cursor-pointer  
                        rounded-full">
                    <FontAwesomeIcon className="mx-2 self-center" icon={faArrowLeft}/>
                    BACK
                </div>
            )
        }
    }

    nextButton = () => {
        if (this.state.configuratorStep < 8) {
            return (
                <div 
                    onClick={() => this.handleProgress("next")}
                    className="
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-indigo-600 
                        text-black 
                        hover:bg-indigo-600 
                        hover:text-white 
                        cursor-pointer 
                        rounded-full">
                    NEXT
                    <FontAwesomeIcon className="mx-2 self-center" icon={faArrowRight}/>
                </div>
            )
        }
    }

    resultButton = () => {
        if (this.state.configuratorStep === 8) {
            return (
                <div 
                    onClick={() => this.handleProgress("result")}
                    className="
                        transition duration-300 ease-in-out 
                        mx-5 
                        p-3 
                        border-2 border-indigo-600 
                        text-black 
                        hover:bg-indigo-600 
                        hover:text-white 
                        cursor-pointer 
                        rounded-full">
                    VYSLEDNA ZOSTAVA
                    <FontAwesomeIcon className="mx-2 self-center" icon={faPollH}/>
                </div>
            )
        }
    }

    render() {
        return (
            <div 
                className="
                    flex 
                    flex-col
                    h-big-2">
                <Navbar/>
                <div 
                    id="nadpis" 
                    className="
                        flex 
                        flex-row 
                        justify-center 
                        my-10">
                    <div>
                        <h1 
                            className="
                                text-3xl
                                lg:text-6xl
                                font-archivo
                                h-64
                                bg-spikeAquamarineBlue
                                bg-no-repeat
                                bg-contain">
                            ./KONFIGURÁTOR
                        </h1>
                    </div>
                </div>
                <div 
                    id="vyhladavanie"
                    className="
                        flex 
                        flex-col 
                        self-center">
                    <h1 
                        className="
                            text-2xl
                            text-center 
                            font-archivo">
                        VYHĽADÁVANIE
                    </h1>
                    <div 
                        className="
                            flex 
                            flex-row 
                            justify-center">
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
                            py-5
                            font-mulish">
                        Vyber si {this.state.configuratorProgress[this.state.configuratorStep]}
                    </h1>
                </div>
                <div 
                    className="
                        overflow-y-scroll 
                        h-big-2">
                    {this.showProducts()}
                    {this.showFinalConfiguration()}
                </div>
                <div className="self-center font-mulish font-bold">
                    <h1>CELKOVO: {this.state.totalPrice}€</h1>
                </div>
                <div 
                    id="naspat-dalej"
                    className="
                        flex 
                        flex-row 
                        justify-center 
                        font-mulish 
                        my-10">
                    {this.backButton()}
                    {this.nextButton()}
                    {this.resultButton()}
                </div>
            </div>
        )
    }
}