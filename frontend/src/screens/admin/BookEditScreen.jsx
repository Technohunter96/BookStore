import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import {
  useGetBookDetailsQuery,
  useUpdateBookMutation,
} from "../../slices/booksApiSlice"

const BookEditScreen = () => {
  const { id: bookId } = useParams()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState("")
  const [pages, setPages] = useState(0)
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const {
    data: book,
    isLoading,
    refetch,
    error,
  } = useGetBookDetailsQuery(bookId)

  const [updateBook, { isLoading: loadingUpdate }] = useUpdateBookMutation()

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateBook({
        bookId,
        title,
        author,
        published,
        genre,
        pages,
        image,
        description,
      })
      toast.success("Book updated successfully!")
      refetch()
      navigate("/admin/booklist")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setAuthor(book.author)
      setPublished(book.published)
      setGenre(book.genre)
      setPages(book.pages)
      setImage(book.image)
      setDescription(book.description)
    }
  }, [book])

  return (
    <>
      <Link to="/admin/booklist" className="btn btn-dark my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1 className="my-3">Edit Book</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error.status}: {error.data.message}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>
                <strong>Author</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="published">
              <Form.Label>
                <strong>Published</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published"
                value={published}
                onChange={(e) => setPublished(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="genre">
              <Form.Label>
                <strong>Genre</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="pages">
              <Form.Label className="font-weight-bold">
                <strong>Pages</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* IMAGE INPUT PLACE HOLDER */}

            <Form.Group controlId="description">
              <Form.Label>
                <strong>Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="dark" style={{ marginTop: "1rem" }}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default BookEditScreen
