import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderForm from './OrderForm';

export default class FinalCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inCart: [],
      totalPrice: 0,
    }
  }

	handleTotal = () => {
		let total = 0;
		this.state.inCart.map(item => total += item.price)
		this.setState({ totalPrice: total.toFixed(2) })
	}

	removeFromCart = (product) => {
		const cart = this.state.inCart
		const productIndex = cart.indexOf(product)
		cart.splice(productIndex, 1)
		this.setState({
			inCart: cart
		}, this.handleTotal)
  }
  
  render() {
    return (
      <div>
        <div className=" flex flex-col self-center container mx-auto">
          {this.state.inCart.map(item =>
            <div className=" flex flex-row justify-between p-3 m-1 w-full md:w-360p self-center border shadow bg-white font-mulish font-bold">
              <p className="self-center mx-2">{item.model.toUpperCase()}</p>
              <FontAwesomeIcon onClick={() => this.removeFromCart(item)} className=" text-red-500 self-center m-1 cursor-pointer text-sm" icon={faTimes} />
            </div>
          )}
        </div>
        <div>
          <OrderForm components={this.state.inCart}/>
        </div>
      </div>
    )
  }
}
