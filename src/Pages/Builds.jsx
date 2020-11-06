import React from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import OrderForm from "../Components/OrderForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faShoppingCart,
  faTimes,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const buildsJson = require("../zostavy.json");

const Card = (props) => {
  return (
    <div className="bg-white text-black shadow-lg rounded">
      <div className="px-6 py-4">
        <div className="flex flex-col justify-between">
          <div className="font-cairo">
            <h2 className="font-archivo font-bold text-4xl mb-2">
              {props.model}
            </h2>
            <p>‣{props.zakladnaDoska}</p>
            <p>‣{props.procesor}</p>
            <p>‣{props.grafickaKarta}</p>
            <p>‣{props.ram}</p>
            <p>‣{props.ssd}</p>
            <p>‣{props.hdd}</p>
            <p>‣{props.zdroj}</p>
            <p>‣{props.skrinka}</p>
            <p>‣{props.chladenie}</p>
          </div>
          <div className={"w-3 self-center"}>
            <Button
              className={"border-carbon-900 hover:bg-carbon-900"}
              onClick={props.onClick}
            >
              <p className="self-center">
                {props.cena}€
                <FontAwesomeIcon className="mx-2" icon={faShoppingCart} />
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default class Builds extends React.Component {
  constructor() {
    super();
    this.state = {
      inCart: [],
      cartVisible: false,
      totalPrice: 0,
      name: "",
      email: "",
      phone: "",
    };
  }

  toggleCart = () => {
    this.setState({ cartVisible: !this.state.cartVisible });
  };

  handleTotal = () => {
    let total = 0;
    this.state.inCart.map((item) => (total += item.price));
    this.setState({ totalPrice: total.toFixed(2) });
  };

  addToCart = (product) => {
    const cart = this.state.inCart.concat(product);
    this.setState(
      {
        inCart: cart,
      },
      this.handleTotal
    );
  };

  removeFromCart = (product) => {
    const cart = this.state.inCart;
    const productIndex = cart.indexOf(product);
    cart.splice(productIndex, 1);
    this.setState(
      {
        inCart: cart,
      },
      this.handleTotal
    );
  };

  cartButton = () => {
    if (!this.state.cartVisible) {
      return (
        <div className={"my-10"}>
          <Button
            className={"border-carbon-900 hover:bg-carbon-900"}
            onClick={this.toggleCart}
          >
            V košíku {this.state.inCart.length} [{this.state.totalPrice}€]
            <FontAwesomeIcon
              className={"mx-2 self-center"}
              icon={faArrowRight}
            />
          </Button>
        </div>
      );
    } else {
      return (
        <div className={"my-5"}>
          <Button
            className={"border-carbon-900 hover:bg-carbon-900"}
            onClick={this.toggleCart}
          >
            <FontAwesomeIcon
              className={"mx-2 self-center"}
              icon={faArrowLeft}
            />
            BACK
          </Button>
        </div>
      );
    }
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  sendOrder = async (event) => {
    event.preventDefault();
    const orderId = Math.floor(1000000 + Math.random() * 9000000).toString();
    const json = JSON.stringify({
      orderId: orderId,
      components: this.state.inCart.join(),
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
    });

    await axios.post(`https://frag-builder.herokuapp.com/order/send`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  buildCards = () => {
    let cards = [];
    for (let key of Object.entries(buildsJson)) {
      const {
        model,
        zakladnaDoska,
        procesor,
        grafickaKarta,
        ram,
        ssd,
        hdd,
        zdroj,
        skrinka,
        chladenie,
        cena,
      } = key[1];
      cards.push(
        <Card
          onClick={() =>
            this.addToCart({ model: model, price: parseInt(cena) })
          }
          model={model}
          zakladnaDoska={zakladnaDoska}
          procesor={procesor}
          grafickaKarta={grafickaKarta}
          ram={ram}
          ssd={ssd}
          hdd={hdd}
          zdroj={zdroj}
          skrinka={skrinka}
          chladenie={chladenie}
          cena={cena}
        />
      );
    }
    return cards;
  };

  render() {
    if (!this.state.cartVisible) {
      return (
        <div>
          <Navbar />
          <div className="h-1440p flex flex-col content-center">
            <div className="flex flex-row justify-center items-center h-360p bg-white shadow">
              <div className={"w-720p h-360p items-center"}>
                <h1 className=" text-6xl font-archivo text-center h-64 text-carbon-900">
                  ./ZOSTAVY
                </h1>
              </div>
            </div>
            <div className={"self-center"}>{this.cartButton()}</div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container md:mx-auto">
              {this.buildCards()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="flex flex-col content-center">
            <div className="flex flex-row justify-center items-center h-360p bg-white shadow-xl">
              <div className={"w-720p h-360p items-center"}>
                <h1 className=" text-6xl font-archivo h-64 text-carbon-900 text-center">
                  ./KOŠÍK
                </h1>
              </div>
            </div>

            <div className="self-center">{this.cartButton()}</div>

            <div className="w-full flex flex-col">
              {this.state.inCart.map((item) => (
                <div className=" flex flex-row justify-between p-3 m-1 w-full md:w-360p self-center border shadow bg-white font-mulish font-bold">
                  <p className="self-center mx-2">{item.model.toUpperCase()}</p>
                  <FontAwesomeIcon
                    onClick={() => this.removeFromCart(item)}
                    className=" text-red-500 self-center m-1 cursor-pointer text-sm"
                    icon={faTimes}
                  />
                </div>
              ))}
            </div>
            <div className=" text-center text-carbon-500 font-mulish font-bold">
              <h1>CELKOVO: {this.state.totalPrice}€</h1>
            </div>
            <OrderForm
              onChangeName={this.handleName}
              onChangeEmail={this.handleEmail}
              onChangePhone={this.handlePhone}
            >
              <Button
                className={"border-carbon-900 hover:bg-carbon-900"}
                onClick={this.sendOrder}
              >
                <p>OBJEDNAŤ</p>
                <FontAwesomeIcon
                  className="mx-2 self-center"
                  icon={faPaperPlane}
                />
              </Button>
            </OrderForm>
          </div>
        </div>
      );
    }
  }
}
