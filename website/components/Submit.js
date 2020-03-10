import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ALL_POSTS_QUERY, allPostsQueryVars } from './PostList'
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CREATE_POST_MUTATION = gql`
  mutation createMinistackArticle($createministackarticleinput: CreateMinistackArticleInput!) {
    createMinistackArticle(input: $createministackarticleinput) {
      id
      title
    }
  }
`

export default function Submit() {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const id = uuidv4()
    form.reset()

    createPost({
      variables: { 
        createministackarticleinput: {
          id: id,
          title: title
        }
      },
      update: (proxy, { data: { createPost } }) => {
        const data = proxy.readQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars,
        })
        // Update the cache with the new post at the top of the
        proxy.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            ...data,
            listMinistackArticles: {
              ...data.listMinistackArticles,
              items: [{
                id: id,
                title: title,
                __typename: "MinistackArticle"
              },...data.listMinistackArticles.items]
            }
          },
          variables: allPostsQueryVars,
        })
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Submit</Form.Label>
        <Form.Control placeholder="title" name="title" type="text" required />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Submit
      </Button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </Form>
  )
}
