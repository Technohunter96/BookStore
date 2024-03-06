import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"
import { useGetLatestBooksQuery } from "../slices/booksApiSlice"

const BookCarousel = () => {
  const { data: books, isLoading, error } = useGetLatestBooksQuery()

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="mb-4"
      style={{
        backgroundImage: `url("/images/library.jpg")`,
        backgroundSize: "cover",
      }}
    >
      {books.map((book) => (
        <Carousel.Item key={book._id}>
          <Link to={`/book/${book._id}`}>
            <Image
              src={book.image}
              alt={book.name}
              className="carousel-image"
              fluid
            />
            <Carousel.Caption className=".carousel-caption">
              <h2>
                {book.author} - {book.title}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default BookCarousel
