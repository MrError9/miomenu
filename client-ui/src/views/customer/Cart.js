import React from 'react';
import { Link } from 'react-router-dom';


//components
import CartItem from '../../components/Menu/CartItem';

const Cart = () => {
	return (
		<div>
			<nav>
				<div class="nav-wrapper">
					<div class="input-field">
						<select>
							<option value="1">Kurdish</option>
							<option value="2">English</option>
							<option value="3">Arabic</option>
						</select>
					</div>
					<Link class="black-text" to="/">
						LOGO
					</Link>
					<Link class="black-text" to="/menu">
						<svg
							id="Layer_1"
							style={{ fill: '#3a3a3a' }}
							data-name="Layer 1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 26 26"
						>
							<path
								class="cls-1"
								d="M24.62,11.73,13.83,1.9a1.23,1.23,0,0,0-1.66,0L1.38,11.73a1.22,1.22,0,0,0-.32,1.35,1.23,1.23,0,0,0,1.15.79H3.94v9.85a.7.7,0,0,0,.7.71h5.92a.7.7,0,0,0,.7-.71v-6h3.48v6a.7.7,0,0,0,.7.71h5.92a.7.7,0,0,0,.7-.71V13.87h1.73a1.23,1.23,0,0,0,1.15-.79A1.22,1.22,0,0,0,24.62,11.73Z"
							/>
						</svg>
					</Link>
				</div>
			</nav>
			<div class="container cart">
				<div class="row">
					<div class="col s12 pl-0">
						<br />
						<strong class="grey-text uppercase">cart</strong>
					</div>
					<CartItem />
					<CartItem />
					<CartItem />
					<CartItem />

				</div>
			</div>
			<div class="check capitalize">
				<p>
					totla <span>$9.99</span>
				</p>
				<hr />
				<p>
					sub <span>$6.9</span>
				</p>
				<hr />
				<p>
					<strong>
						Grand total <span>$9.99</span>
					</strong>
				</p>
				<button class="btn-large black">checkout</button>
			</div>
		</div>
	);
};

export default Cart;
