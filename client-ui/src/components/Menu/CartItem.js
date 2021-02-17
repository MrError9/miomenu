import React from 'react';

const CartItem = () => {
	return (
		<div class="col s12 pl-0">
			<div class="card horizontal">
				<div class="card-stacked">
					<div class="card-content pl-0 pr-0">
						<strong class="uppercase">greek salad.</strong>
						<br />
						<small class="green-text">I am a very ...</small>
					</div>
					<div class="card-action pl-0 pr-0">
						<div class="order-quantity pl-0">
							<button class="btn black">
								<strong>-</strong>
							</button>
							<p>2</p>
							<button class="btn black">
								<strong>+</strong>
							</button>
						</div>
						<strong>$12.99</strong>
					</div>
				</div>
				<div class="card-image">
					<img src="http://localhost:5000/server/uploads/system/food.png" />
				</div>
			</div>
		</div>
	);
};

export default CartItem;
