import React, { useEffect } from 'react';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Menu from './views/customers/Menu';
import Cart from './views/customers/Cart';  
import Registration from './views/customers/Registration';  
import RequestsView from './views/Staff/RequestsView';  
 
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import './styles/menu.css'
import './styles/staff.css'

function App() {
	useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
		M.Sidenav.init(sidenav, {});
	}, []);
	return (
		<Router>
			<Route exact path="/" exact component={Join} />
			<Route exact path="/registration" component={Registration} />
			<Route exact path="/manage/requests" component={RequestsView} />
			<Route exact path="/chat" component={Chat} />
			<Route exact path="/menu" component={Menu} />
			<Route exact path="/cart" component={Cart} />
		</Router>
	);
}

export default App;
