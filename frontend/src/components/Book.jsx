import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Book = ({ book }) => {
  return (
    <Card className="my-3 p-2 rounded">
      <Link to={`/book/${book._id}`}>
        <Card.Img src={book.image} className="book-img" variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as="div" className="book-title">
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Book
