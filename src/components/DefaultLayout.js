import { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineBell, AiOutlineSearch  } from 'react-icons/ai';

const DefaultLayout = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/">Smart Aviation</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown
                                title="Menu"
                                align="end"
                                menuVariant="dark"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid>
                <Row>
                    <Col md={2} className="bg-light sidebar">
                        <Nav className="flex-column mt-3 sidebar-nav">
                            <Link to="/" className="text-black p-2"><AiOutlineSearch className='mb-1'/> Search Flights</Link>
                            <Link to="/saved" className="text-black p-2"><AiOutlineBell className='mb-1'/> Saved Flights</Link>
                        </Nav>
                    </Col>
                    <Col md={10}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DefaultLayout;
