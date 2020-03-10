import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export const ALL_POSTS_QUERY = gql`
  query listMinistackArticles {
    listMinistackArticles {
      items {
        id,
        title      
      }
    }
  }
`

export const allPostsQueryVars = {
  skip: 0,
  first: 10,
}

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: listMinistackArticles.length,
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) {
  //         return previousResult
  //       }
  //       return Object.assign({}, previousResult, {
  //         // Append the new posts results to the old one
  //         listMinistackArticles: [...previousResult.listMinistackArticles, ...fetchMoreResult.listMinistackArticles],
  //       })
  //     },
  //   })
  // }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { listMinistackArticles, _listMinistackArticlesMeta } = data
  // const areMorePosts = listMinistackArticles.length < _listMinistackArticlesMeta.count

  return (
    <Container fluid="true">
      <Row>
        {listMinistackArticles.items.map((post, index) => (
          <Col key={post.id} lg="4">
            <Card>
              <Card.Body>{post.title}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
