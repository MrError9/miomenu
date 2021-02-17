import { Sidenav } from 'materialize-css';
import React from 'react';
const SingleTable = () => {
	return (
			<main>
				<div className="breadcrumbs">
					<h3>table 69</h3>
					<a>Tables </a>
					<a> Tables </a>
					<a> Tables </a>
					<a> Tables</a>
				</div>
				<br />
				<div className="row">
					<button className="btn-flat mr-8 capitalize">delivered</button>
					<button className="btn-flat mr-8 capitalize">pending</button>
					<button className="btn-flat mr-8 capitalize">empty</button>
				</div>
				<div className="row">
					<div className="col s8 pl-0">
						<div className="col s4 pl-0">
							<div className="card horizontal">
								<div className="card-stacked">
									<div className="card-content pl-0 pr-0">
										<strong className="uppercase green-text">Table Uno</strong>
									</div>
									<div className="card-action pl-0 pr-0">
										<small>items</small>
										<small>$12.99</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col s4 pl-0">
							<div className="card horizontal">
								<div className="card-stacked">
									<div className="card-content pl-0 pr-0">
										<strong className="uppercase orange-text">Table Uno</strong>
									</div>
									<div className="card-action pl-0 pr-0">
										<small>items</small>
										<small>$12.99</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col s4 pl-0">
							<div className="card horizontal">
								<div className="card-stacked">
									<div className="card-content pl-0 pr-0">
										<strong className="uppercase green-text">Table Uno</strong>
									</div>
									<div className="card-action pl-0 pr-0">
										<small>items</small>
										<small>$12.99</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col s4 pl-0">
							<div className="card horizontal">
								<div className="card-stacked">
									<div className="card-content pl-0 pr-0">
										<strong className="uppercase orange-text">Table Uno</strong>
									</div>
									<div className="card-action pl-0 pr-0">
										<small>items</small>
										<small>$12.99</small>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col s4 pr-0">
						<div className="col s12 check-wrapper">
							<div>
								<small className="uppercase">subtotal</small>
								<small className="uppercase">$69</small>
							</div>
							<hr />
							<div>
								<small className="uppercase">service</small>
								<small className="uppercase">$69</small>
							</div>
							<hr />
							<div>
								<strong>total</strong>
								<strong>$69</strong>
							</div>
							<br />
							<div>
								<strong>discount</strong>
								<button className="btn black">check</button>
							</div>
						</div>
					</div>
				</div>
			</main>
	);
};

export default SingleTable;
