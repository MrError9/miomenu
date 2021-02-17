import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import {
	sendRequest,
	requestSent,
	checkCustomer,
	checkRequest,
	setUser
} from '../../actions/customer-db/registrationActions';

const ENDPOINT = '192.168.1.9:5000';
let socket;

const getParams = (location) => {
	const { table } = queryString.parse(location.search);
	return table || null;
};

function testStorage(history) {
	var test = 'test';
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
	} catch (e) {
		history.push('/disabled-storage');
	}
}

const Registration = ({ location }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const customer = useSelector((state) => state.customer);

	const [ name, setName ] = useState('');

	const onCheckCustomer = async (id, name) => {
		try {
			const customer = await checkCustomer(id, name);
			if (customer) {
				dispatch(setUser(customer));
				history.push('/menu');
			} else {
				const request = await checkRequest(id);
				if (request) {
					dispatch(requestSent());
					socket.emit('waitingRequestResponse',request, () =>{
						console.log('waiting for request response')
					})
				}
			}
			if (name) setName(name);
		} catch (error) {
			alert('there is an error');
		}
	};

	useEffect(() => {
		testStorage(history); //listen for sockets
		socket = io(ENDPOINT);

		socket.on('request_response', (res) => {
			const { customer, result } = res;
			console.log('customer', customer);
			console.log('result', result);
			if (result === 'accepted' && customer) dispatch(setUser(customer));
		});
		try {
			const mioCustomer = JSON.parse(localStorage.getItem('MioCustomer'));
			console.log('customer', mioCustomer);
			//customer exist in redux
			if (customer.isRegistered) history.push('/menu');
			else if (mioCustomer != null) {
				//customer exist in LS
				const { customerId, name } = mioCustomer;
				//customer exist in db
				if (customerId) onCheckCustomer(customerId, name);
			}
		} catch (error) {
			alert('there is an error');
		}

		return () => socket.disconnect();
	}, []);

	const onSendRequest = async () => {
		const requestId = Date.now() + '';
		const newCustomer = {
			name,
			tableId: getParams(location),
			customerId: requestId,
			request: 'send'
		};
		try {
			localStorage.setItem('MioCustomer', JSON.stringify(newCustomer));
			await sendRequest(newCustomer);
			socket.emit('customerRequest', newCustomer, () => {
				console.log('REQUEST SENT TO THE SERVER');
			});
			dispatch(requestSent());
			alert('request send');
		} catch (error) {
			alert('there is an error', error);
		}
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};
	return (
		<div className="request-wrapper">
			<br />
			<div className="request-logo">
				<img src="http://192.168.1.9:5000/server/uploads/system/logoo.png" />
			</div>
			<br />
			<br />
			<div className="full-width">
				message that will tell ...:
				<div className="input-field inline full-width ml-0">
					<input
						value={name}
						onChange={handleChange}
						id="email_inline"
						type="text"
						className="validate"
						placeholder="name"
					/>
					<span className="helper-text" data-error="wrong" data-success="right">
						Name must be between 2 & 10 letters{' '}
					</span>
				</div>
			</div>
			<div className="service full-width">
				<button
					onClick={onSendRequest}
					disabled={name.length < 2 || name.length > 10 || getParams(location) === null}
					className="btn black full-width"
				>
					Submit
				</button>
			</div>
			{customer.request === 'sent' && (
				<div>
					<div className="load-overlay" />
					<div className="preloader-wrapper big active">
						<div className="spinner-layer spinner-blue-only">
							<div className="circle-clipper left">
								<div className="circle" />
							</div>
							<div className="gap-patch">
								<div className="circle" />
							</div>
							<div className="circle-clipper right">
								<div className="circle" />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Registration;
