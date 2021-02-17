import { Sidenav } from 'materialize-css';
import React from 'react';
const Cashier = () => {
	return (
			<main>
				<div className="breadcrumbs">
					<h3>Page Name</h3>
					<a>Tables </a>

					<a> Tables </a>

					<a> Tables </a>

					<a> Tables</a>
				</div>
				<br />
				<div className="row">
					<button className="btn mr-8 green capitalize">delivered</button>
					<button className="btn mr-8 orange capitalize">pending</button>
					<button className="btn mr-8 grey capitalize">empty</button>
				</div>
				<div className="row">
					<div className="col s12 pl-0">
						<div className="col s3 pl-0">
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
						<div className="col s3 pl-0">
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
						<div className="col s3 pl-0">
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
						<div className="col s3 pl-0">
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
				</div>
			</main>
	);
};

export default Cashier;
