import { Link } from "react-router-dom"
import { ListGroup, Row, Col, Image, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { FaTrash } from "react-icons/fa"
import Loader from "./Loader"
import Message from "./Message"
import { toast } from "react-toastify"
import { useGetBookDetailsQuery } from "../slices/booksApiSlice"
import { useRemoveFromFavoritesMutation } from "../slices/userApiSlice"

const FavoriteBookItem = ({ bookId }) => {
  const { userInfo } = useSelector((state) => state.auth)
  const userId = userInfo ? userInfo._id : null

  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookId)
  const [removeFromFavorites, { isLoading: loadingRemove }] =
    useRemoveFromFavoritesMutation()

  const removeFromFavoritesHandler = async (userId, bookId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await removeFromFavorites({ userId, bookId }).unwrap()
        window.location.reload()
      } catch (err) {
        toast.error(err?.data?.message || err?.error)
      }
    }
  }

  return (
    <>
      {loadingRemove && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <ListGroup.Item>
            <Row className="row-container">
              <Col md={1}>
                <Image src={book.image} alt={book.title} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/book/${book._id}`}>{book.title}</Link>
              </Col>
              <Col md={2}>{book.author}</Col>
              <Col md={1}>{book.published}</Col>
              <Col md={2}>{book.genre}</Col>
              <Col md={2}>{book.pages} pages</Col>
              <Col md={1}>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeFromFavoritesHandler(userId, book._id)}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </>
      )}
    </>
  )
}

export default FavoriteBookItem
