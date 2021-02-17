import React from 'react';

const ItemCard = () => {
	return (
		<div>
			<div className="card">
				<img className="circle" src="http://192.168.1.9:5000/server/uploads/system/food.png" alt="" />
				<h4>greek salad</h4>
				<div className="food-details">
					<p>
						16 <br /> minutes
					</p>
					<p>
						16 <br /> minutes
					</p>
					<p>
						123 <br /> calories
					</p>
				</div>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, repellendus cumque.</p>
				<div className="row size-wrapper ml-0">
					<div className="input-field col s5 pl-0">
						<select>
							<option value="1">small</option>
							<option value="2">Option 2</option>
							<option value="3">Option 3</option>
						</select>
					</div>
					<div className="col s7 pr-0">
						<p>
							<strong>$12.99</strong>
						</p>
					</div>
				</div>
				<div className="row size-wrapper ml-0">
					<div className="col s5 order-quantity pl-0">
						<button className="btn black">
							<strong>-</strong>
						</button>
						<p>2</p>
						<button className="btn black">
							<strong>+</strong>
						</button>
					</div>
					<div className="col s7 pr-0">
						<button className="btn right custom-btn">add</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
