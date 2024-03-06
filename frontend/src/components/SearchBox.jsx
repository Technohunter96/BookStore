import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"

const SearchBox = () => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword)

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword) {
      navigate(`/search/${keyword.trim()}`)
      setKeyword("")
    } else {
      navigate("/")
    }
  }

  return (
    <Form onSubmit={submitHandler} className="d-flex my-sm-1 my-md-0">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search Books..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
