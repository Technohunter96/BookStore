import { useSelector } from "react-redux"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import { FaHeart } from "react-icons/fa"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Meta from "../components/Meta"
import { toast } from "react-toastify"
import { useGetBookDetailsQuery } from "../slices/booksApiSlice"
import { useAddToFavoritesMutation } from "../slices/userApiSlice"
import { useGetProfileQuery } from "../slices/userApiSlice"

const BookScreen = () => {
  const { id: bookId } = useParams()

  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo ? userInfo._id : null

  const { data: profile } = useGetProfileQuery()
  const favoriteBooks = profile?.favoriteBooks || []

  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookId)

  const [addToFavorites, { isLoading: loadingAdd }] =
    useAddToFavoritesMutation()

  const addToFavoritesHandler = async (userId, bookId) => {
    try {
      await addToFavorites({ userId, bookId }).unwrap()
      navigate("/favorites")
      window.location.reload()
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadingAdd && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={book.title} />
          <Row>
            <Col md={4}>
              <Image src={book.image} alt={book.title} fluid />
            </Col>
            <Col md={7}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{book.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Author:</strong> {book.author}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Genre:</strong> {book.genre}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Published:</strong> {book.published}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pages:</strong> {book.pages}
                </ListGroup.Item>
                <ListGroup.Item>{book.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={1}>
              {userInfo && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Button
                      variant="light"
                      className="m-2"
                      type="button"
                      disabled={favoriteBooks.includes(bookId)}
                      onClick={() => addToFavoritesHandler(userId, book._id)}
                    >
                      <FaHeart />
                      <p>Add To My Favorite Books</p>
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default BookScreen
