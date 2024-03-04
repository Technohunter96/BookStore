import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { FaBook, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../slices/userApiSlice"
import { logout } from "../slices/authSlice"
import logo from "../assets/logo.png"

const Header = () => {
  const { favoriteItems } = useSelector((state) => state.favorite)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap
      dispatch(logout())
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} className="logo" alt="BookStore" /> BookStore
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/favorites">
                <Nav.Link>
                  <FaBook /> Favorites
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
