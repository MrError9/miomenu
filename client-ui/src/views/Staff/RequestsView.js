import { Sidenav } from 'materialize-css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ENDPOINT = '192.168.1.9:5000';
let socket;

const RequestsView = () => {
	const [ items, setItems ] = useState([]);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.on('new_request', handleNewItem);
		return () => socket.disconnect();
	}, []);

	const onRequestAccept = (request) => {
		//svae customer to db, emit new customer
		socket.emit('request_result', request, () => {});
	};

	const handleNewItem = (request) => {
		if (request) {
			const newTime = Date.now();
			const newitem = {
				name: request.name,
				table: request.tableId,
				customerId: request.customerId,
				time: parseInt((newTime - request.customerId) / 60000)
			};
			console.log('items', items);
      setItems(items => [ ...items, newitem ]);
		}
	};

	console.log('items', items)
	return (
		<div className="sfaff-wrapper">
			<aside>
				<div className="aside-img">
					<img src={require('../../assets/food png.png')} />
				</div>
				<ul>
					<li>tables</li>
					<li>tables</li>
					<li>tables</li>
					<li>tables</li>
					<li>tables</li>
					<li>tables</li>
				</ul>
			</aside>
			<main>
				<div className="breadcrumbs">
					<h3>Page Name</h3>
					<a>Admin </a>
					{'>'}
					<a> Staff </a>
					{'>'}
					<a> Manage </a>
					{'>'}
					<a> Requests</a>
				</div>
				<br />
				<div className="row">
					<button className="btn mr-8 orange capitalize">pending</button>
					<button className="btn mr-8 red capitalize">rejected</button>
					<button className="btn mr-8 black capitalize">blocked</button>
				</div>
				<div className="row">
					<div className="col s12 pl-0">
						<div className="col s3 pl-0">
							{items.map((i, index) => (
								<div key={index} className="card horizontal">
									<div className="card-stacked">
										<div className="card-content pl-0 pr-0">
											<strong className="uppercase full-width table-id">
												Table {i.table} - {i.name}
												<span className="ml-auto grey-text">
													<small>{i.time} min</small>
												</span>
											</strong>
										</div>
										<div className="card-action pl-0 pr-0 request-btns">
											<button
												onClick={() => onRequestAccept(i)}
												className="waves-effect custom-tab btn-flat capitalize green-text"
											>
												accept
											</button>
											<button className="waves-effect custom-tab btn-flat capitalize red-text">decline</button>
											<button className="waves-effect custom-tab btn-flat capitalize">block</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default RequestsView;
