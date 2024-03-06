import { Row, Col } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import Book from "../components/Book.jsx"
import Loader from "../components/Loader.jsx"
import Message from "../components/Message.jsx"
import Paginate from "../components/Paginate.jsx"
import BookCarousel from "../components/BookCarousel.jsx"
import Meta from "../components/Meta.jsx"
import { useGetBooksQuery } from "../slices/booksApiSlice.js"

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error } = useGetBooksQuery({ pageNumber, keyword })

  return (
    <>
      {!keyword ? (
        <>
          <h1>Latest Books</h1>
          <BookCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Books</h1>
          <Row>
            {data.books.map((book) => (
              <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                <Book book={book} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
