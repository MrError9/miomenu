import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction, setCurrentUser } from '../../actions/user-db/authActions';

const Auth = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.auth);
	const errors = useSelector((state) => state.errors);
	const [ data, setData ] = useState({ name: '', password: '' });

	useEffect(
		() => {
			if (user.isAuthenticated) history.push('/dashboard');
		},
		[ user ]
	);

	const onLogin = async () => {
		try {
			const decode = await loginAction(data);
			if(decode)dispatch(setCurrentUser(decode));
			console.log('login action', decode);
		} catch (error) {
			console.log('login error', error);
		}
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
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
				LOGIN
				<div className="input-field inline full-width ml-0">
					<input
						value={data.name}
						onChange={handleChange}
						name="name"
						id="email_inline"
						type="text"
						className="validate"
						placeholder="name"
					/>
				</div>
				<div className="input-field inline full-width ml-0">
					<input
						value={data.password}
						onChange={handleChange}
						name="password"
						id="password_inline"
						type="password"
						className="validate"
						placeholder="password"
					/>
				</div>
			</div>
			<div className="service full-width">
				<button
					onClick={onLogin}
					disabled={data.name.length < 3 || data.password.length < 4}
					className="btn black full-width"
				>
					Submit
				</button>
				{errors.username && <span className="helper-text">Wrong username or password</span>}
			</div>
			{user.isLoading === 'sent' && (
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

export default Auth;
