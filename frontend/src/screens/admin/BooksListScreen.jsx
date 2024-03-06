import { useParams, Link } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Paginate from "../../components/Paginate"
import { toast } from "react-toastify"
import {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} from "../../slices/booksApiSlice"

const BooksListScreen = () => {
  const { pageNumber } = useParams()

  const { data, isLoading, error, refetch } = useGetBooksQuery({ pageNumber })

  const [createBook, { isLoading: loadingCreate }] = useCreateBookMutation()

  const [deleteBook, { isLoading: loadingDelete }] = useDeleteBookMutation()

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id)
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
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
          <h1>Books</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="btn-sm btn-success my-3"
            onClick={createBookHandler}
          >
            <FaPlus /> Create Book
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}

      {loadingDelete && <Loader />}

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
              {data.books.map((book) => (
                <tr key={book._id}>
                  <td className="text-start">
                    <img src={book.image} alt={book.title} />
                  </td>
                  <td>
                    <Link to={`/book/${book._id}`}>{book.title}</Link>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.published}</td>
                  <td>{book.genre}</td>
                  <td>{book.pages}</td>
                  <td>
                    <LinkContainer to={`/admin/book/${book._id}/edit`}>
                      <Button variant="secondary" className="btn-sm mx-2">
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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default BooksListScreen
