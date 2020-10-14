import React from 'react'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import {faArrowLeft, faArrowRight, faPollH, faSearch, faShoppingCart, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Components/Button'
import { text } from '@fortawesome/fontawesome-svg-core'

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
                        w-720p
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
                                w-full
                                xl:w-2/4
                                self-center
                                border
                                shadow
                                bg-white
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
                        sm:mx-auto
                        md:mx-auto
                        lg:mx-auto
                        xl:mx-auto
                        my-10">
                    {this.state.fetchedData.map((item, key) => 
                        <div 
                            key={key}
                            className="
                                font-mulish
                                flex
                                flex-col
                                justify-between
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
                                    py-2
                                    px-4
                                    border 
                                    border-aquamarine-300
                                    rounded-full
                                    hover:bg-aquamarine-300
                                    hover:text-white
                                    self-center
                                    cursor-pointer">
                                <FontAwesomeIcon className="mx-1" icon={faShoppingCart}/>
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
                <Button 
                    color="aquamarine"
                    onClick={() => this.handleProgress("back")}>
                    <FontAwesomeIcon className="mx-2 self-center text-white" icon={faArrowLeft}/>
                    <p className="text-white">BACK</p>
                </Button>
            )
        }
    }

    nextButton = () => {
        if (this.state.configuratorStep < 8) {
            return (
                <Button 
                    color="indigo"
                    onClick={() => this.handleProgress("next")}>
                    <p className="text-white">NEXT</p>
                    <FontAwesomeIcon className="mx-2 self-center text-white" icon={faArrowRight}/>
                </Button>
            )
        }
    }

    resultButton = () => {
        if (this.state.configuratorStep === 8) {
            return (
                <Button 
                    color="indigo"
                    onClick={() => this.handleProgress("result")}>
                    <p className="text-white">VYSLEDNA ZOSTAVA</p>
                    <FontAwesomeIcon className="mx-2 self-center text-white" icon={faPollH}/>
                </Button>
            )
        }
    }

    render() {
        return (
            <div
                className="
                    flex 
                    flex-col">
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
                                text-5xl
                                sm:text-6xl
                                text-carbon-500
                                font-archivo
                                h-64
                                bg-aquaspikes
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
                            text-carbon-500
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
                            placeholder="začni hľadať">    
                        </input>
                    </div>
                    <h1 
                        className="
                            text-center
                            text-xl
                            md:text-2xl
                            lg:text-4xl
                            py-5
                            font-mulish">
                        {this.state.configuratorProgress[this.state.configuratorStep]}
                    </h1>
                    <p className="font-bold font-cairo text-center">Ak chceš, môžeš si zvoliť viacero komponentov a na konci konfigurácie si ich môžeš povyhadzovať z košíka..</p>
                </div>
                <div 
                    className="
                        bg-pcComponentsBackground
                        bg-cover
                        bg-center
                        bg-no-repeat
                        overflow-y-scroll 
                        h-720p">
                    {this.showProducts()}
                    {this.showFinalConfiguration()}
                </div>
                <div 
                    className="
                        bg-carbon-500 
                        w-full
                        my-10
                        py-10">
                    <div className="text-center text-white font-mulish font-bold">
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
            </div>
        )
    }
}