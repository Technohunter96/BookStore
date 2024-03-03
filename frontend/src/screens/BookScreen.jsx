import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { FaHeart } from "react-icons/fa"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useGetBookDetailsQuery } from "../slices/booksApiSlice"
import { addToFavorites } from "../slices/favoriteSlice.js"

const BookScreen = () => {
  const { id: bookId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToFavoriteHandler = () => {
    dispatch(addToFavorites(book))
    navigate("/favorites")
  }

  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookId)

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Image src={book.image} alt={book.name} fluid />
            </Col>
            <Col md={7}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{book.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Author: {book.author}</ListGroup.Item>
                <ListGroup.Item>Genre: {book.genre}</ListGroup.Item>
                <ListGroup.Item>Published: {book.published}</ListGroup.Item>
                <ListGroup.Item>Pages: {book.pages}</ListGroup.Item>
                <ListGroup.Item>{book.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={1}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button
                    className="btn btn-dark"
                    type="button"
                    //   disabled={!user}
                    onClick={addToFavoriteHandler}
                  >
                    <FaHeart />
                    <p>Add To My Favorite Books</p>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default BookScreen
