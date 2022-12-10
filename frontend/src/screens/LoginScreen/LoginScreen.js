import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import "./LoginScreen.css";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;
	const navigate = useNavigate();

	useEffect(() => {

		if (userInfo) {
			navigate('/mynotes');
		}
	}, [navigate,userInfo]);


	const submitHandler =  (e) => {
		e.preventDefault();

		dispatch(login(email, password));

	};

	return (
		<>
			<MainScreen title="Login" />
			<div className='loginContainer'>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Form.Text className="text-muted">
						We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						New Customer ? <Link to="/register">Register Here</Link>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default LoginScreen