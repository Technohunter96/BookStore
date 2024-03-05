import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import {
  useGetBooksQuery,
  useCreateBookMutation,
} from "../../slices/booksApiSlice"

const BooksListScreen = () => {
  const { data: books, isLoading, error, refetch } = useGetBooksQuery()

  const [createBook, { isLoading: loadingCreate }] = useCreateBookMutation()

  const deleteHandler = () => {
    console.log("delete")
  }

  const createBookHandler = async () => {
    if (window.confirm("Are you sure you want to create a new book?")) {
      try {
        await createBook()
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="btn-sm btn-success my-3"
            onClick={createBookHandler}
          >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Genre</th>
                <th>Pages</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="text-start">
                    <img src={book.image} alt={book.title} />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.published}</td>
                  <td>{book.genre}</td>
                  <td>{book.pages}</td>
                  <td>
                    <LinkContainer to={`/admin/book/${book._id}/edit`}>
                      <Button variant="dark" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(book._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination placeholder */}
        </>
      )}
    </>
  )
}

export default BooksListScreen
