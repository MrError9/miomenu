import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { userToken } from './actions/user-db/authActions'
//customer
import Join from './components/Join/Join';
import Menu from './views/customer/Menu';
import Cart from './views/customer/Cart';
import Register from './views/customer/Register';
//Manage
import Sidenav from './components/Sidenav/Sidenav';
// import RequestsView from './views/manage/RequestsView';
// import Cashier from './views/manage/Cashier';
// import SingleOrder from './views/manage/SingleOrder';
// import SingleTable from './views/manage/SingleTable';
//User
import Login from './views/user/Auth';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import './styles/menu.css';
import './styles/staff.css';

if (localStorage.jwtToken) {
	console.log('app');
	userToken(localStorage.jwtToken);
}

function App() {
	useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
		M.Sidenav.init(sidenav, {});
	}, []);
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Join} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/registration" component={Register} />
				{/* <Route exact path="/chat" component={Chat} /> */}
				<Route exact path="/menu" component={Menu} />
				<Route exact path="/cart" component={Cart} />
				<div className="sfaff-wrapper">
					<Sidenav />
					<Switch>
						{/* <Route exact path="/manage/requests" component={RequestsView} /> */}
						{/* <Route exact path="/cashier" component={Cashier} /> */}
						{/* <Route exact path="/single_order" component={SingleOrder} /> */}
						{/* <Route exact path="/single_table" component={SingleTable} /> */}
					</Switch>
				</div>
			</Switch>
		</Router>
	);
}

export default App;
