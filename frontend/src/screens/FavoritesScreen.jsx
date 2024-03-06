import { Link } from "react-router-dom"
import { Row, Col, ListGroup } from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import FavoriteBookItem from "../components/FavoriteBookItem"
import { useGetProfileQuery } from "../slices/userApiSlice"

const FavoritesScreen = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery()
  const favoriteBooks = profile?.favoriteBooks || []

  return (
    <Row>
      <Col md={12}>
        <h1 style={{ marginBottom: "20px" }}>Favorite Books</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error.message}</Message>
        ) : favoriteBooks.length === 0 ? (
          <Message>
            Your favorite books are empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {favoriteBooks.map((bookId) => (
              <FavoriteBookItem key={bookId} bookId={bookId} />
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default FavoritesScreen
