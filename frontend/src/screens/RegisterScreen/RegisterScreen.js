import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import "./RegisterScreen.css";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pic, setPic] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [picMessage, setPicMessage] = useState("");

	const dispatch = useDispatch();
	const userRegister = useSelector(state => state.userRegister);
	const { loading, error, userInfo } = userRegister;
	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) {
			navigate("/mynotes");
		}
	}, [navigate, userInfo]);


	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			setMessage("");
			dispatch(register(name, pic, email, password));
		}
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please select an image");
		}
		setPicMessage(null);

		if (pics.type === "image/png" || pics.type === "image/jpeg") {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'notezipper');
			data.append('cloud_name', 'dnymu8b28');
			fetch('https://api.cloudinary.com/v1_1/dnymu8b28/image/upload', {
				method: 'post',
				body: data
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});

		} else {
			return setPicMessage("Please select an image");
		}
	};

	return (
		<>
			<MainScreen title="Sign Up" />
			<div className='registerContainer'>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
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

					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					{picMessage &&
						<ErrorMessage variant="danger">{picMessage}</ErrorMessage>
					}

					<Form.Group className="mb-3" controlId="pic">
						<Form.Label>Profile Picture</Form.Label>
						<Form.Control
							type="file"
							label="Upload Profile Picture"
							onChange={(e) => postDetails(e.target.files[0])}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						Have an Account ? <Link to="/login">Login</Link>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default RegisterScreen;