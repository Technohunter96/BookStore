import { Badge, Navbar, Nav, Container } from "react-bootstrap"
import { FaBook, FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector } from "react-redux"
import logo from "../assets/logo.png"

const Header = () => {
  const { favoriteItems } = useSelector((state) => state.favorite)

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
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
