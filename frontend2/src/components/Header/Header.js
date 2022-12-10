import React, { useEffect } from "react";
import {
	Container,
	Form,
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	}

	useEffect(() => {}, [userInfo]);


	return (
		<Navbar  expand="lg" bg="primary" variant="dark">
			<Container>
				<Navbar.Brand>
					<Link to="/"> Note Zipper</Link>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="m-auto">
						{userInfo && (
							<Form>
								<FormControl
									type="text"
									placeholder="Search"
									className="mr-sm-2"
									onChange={(e) => setSearch(e.target.value)}
								/>
							</Form>
						)}
					</Nav>
					<Nav>
						{userInfo ? (
							<>
								<Nav.Link as={Link} to="/mynotes">My Notes</Nav.Link>
								<NavDropdown
									title={`${userInfo.name}`}
									id="basic-nav-dropdown"
								>
								<NavDropdown.Item href="/profile">
									{/* <img
									alt=""
									src={`${userInfo.pic}`}
									width="25"
									height="25"
									style={{ marginRight: 10 }}
									/> */}
									My Profile
								</NavDropdown.Item>

								<NavDropdown.Divider />
								<NavDropdown.Item
									onClick={logoutHandler}
								>
									Logout
								</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<Nav.Link href="/login">Login</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;