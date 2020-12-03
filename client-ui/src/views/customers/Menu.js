import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';

//components
import ItemCard from '../../components/Menu/ItemCard';

import 'swiper/swiper.scss';

const Menu = () => {
//	const dispatch = useDispatch();
//	const user = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
	//if (user) history.push('/create');

	}, []);

	// const loginAction = () => {
	// 	console.log('this is the one');
	// 	const userData = {
	// 		name,
	// 		password
	// 	};
	// 	dispatch(loginUser(userData));
	// };
	return (
		<div>
			<nav>
				<div className="nav-wrapper black-text">
					<div className="input-field">
						<select>
							<option value="1">Kurdish</option>
							<option value="2">English</option>
							<option value="3">Arabic</option>
						</select>
					</div>
					<Link className="black-text" to="/">
						LOGO
					</Link>
					<Link className="black-text" to="/cart">
						<svg
							style={{ fill: '#3a3a3a' }}
							id="Layer_1"
							data-name="Layer 1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 26 26"
						>
							<path
								className="cls-1"
								d="M0,16.05H0a.76.76,0,0,0,.76.76h.55a.89.89,0,0,1,.8.49l.66,1.32a2.23,2.23,0,0,0,2,1.24H9.12A.93.93,0,0,1,10,21.09l-.34,1a1.17,1.17,0,0,1-1.12.81H8.43a.76.76,0,0,0-.76.76h0a.77.77,0,0,0,.76.77h9.14a.77.77,0,0,0,.76-.77h0a.76.76,0,0,0-.76-.76h-.12a1.17,1.17,0,0,1-1.12-.81l-.34-1a.93.93,0,0,1,.89-1.23h4.35a2.23,2.23,0,0,0,2-1.24l.66-1.32a.89.89,0,0,1,.8-.49h.55a.76.76,0,0,0,.76-.76h0a.76.76,0,0,0-.76-.76H.76A.76.76,0,0,0,0,16.05Zm0-.76"
							/>
							<path
								className="cls-1"
								d="M15.07,4.81a2.23,2.23,0,0,0,.1-1.66,2.29,2.29,0,0,0-4.46.71,2.17,2.17,0,0,0,.22.95,11.46,11.46,0,0,0-8.55,7,1.39,1.39,0,0,0,1.29,1.92H22.33a1.39,1.39,0,0,0,1.29-1.92,11.46,11.46,0,0,0-8.55-7Zm-2.83-.95a.76.76,0,1,1,.76.76.76.76,0,0,1-.76-.76Zm0,0"
							/>
						</svg>
					</Link>
				</div>
			</nav>
			<div className="container">
				<div className="row">
					<div className="col s12 pl-0">
						<br />
						<strong className="uppercase grey-text">menu</strong>
						<div className="custom-tabs">
							<button className="waves-effect custom-tab btn-flat capitalize active">salad</button>
							<button className="waves-effect custom-tab btn-flat capitalize">pasta</button>
							<button className="waves-effect custom-tab btn-flat capitalize">spaghetti</button>
							<button className="waves-effect custom-tab btn-flat capitalize">pizza</button>
							<button className="waves-effect custom-tab btn-flat capitalize">burger</button>
							<button className="waves-effect custom-tab btn-flat capitalize">salad</button>
							<button className="waves-effect custom-tab btn-flat capitalize">salad</button>
						</div>
					</div>
				</div>
			</div>
			<Swiper
				className={'swiper-container'}
				spaceBetween={12}
				slidesPerView={1.1}
				centeredSlides={true}
				breakpoints={{
					768: {
						slidesPerView: 1.8,
						spaceBetween: 40,
						centeredSlides: false
					},
					1220: {
						slidesPerView: 3.5,
						spaceBetween: 50,
						centeredSlides: false
					}
				}}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				<SwiperSlide className="swiper-slide">
					<ItemCard />
				</SwiperSlide>
				<SwiperSlide className="swiper-slide">
					<ItemCard />
				</SwiperSlide>
				<SwiperSlide className="swiper-slide">
					<ItemCard />
				</SwiperSlide>
			</Swiper>
			<div className="swiper-container">
				<div className="swiper-wrapper" />
			</div>
			<div className="service">
				<button className="btn-large black">ask for service</button>
			</div>
		</div>
	);
};

export default Menu;
