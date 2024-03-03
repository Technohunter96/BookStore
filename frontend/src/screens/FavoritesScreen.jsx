import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import Message from "../components/Message"
import { removeFromFavorites } from "../slices/favoriteSlice"

const FavoritesScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const favorite = useSelector((state) => state.favorite)
  const { favoriteItems } = favorite

  const removeFromFavoritesHandler = (id) => {
    dispatch(removeFromFavorites(id))
  }

  return (
    <Row>
      <Col md={12}>
        <h1 style={{ marginBottom: "20px" }}>Favorite Books</h1>
        {favoriteItems.length === 0 ? (
          <Message>
            Your favorite books are empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {favoriteItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/book/${item._id}`}>{item.title}</Link>
                  </Col>
                  <Col md={2}>{item.author}</Col>
                  <Col md={1}>{item.published}</Col>
                  <Col md={2}>{item.genre}</Col>
                  <Col md={2}>{item.pages} pages</Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => removeFromFavoritesHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default FavoritesScreen
