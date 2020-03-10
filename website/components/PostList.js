import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'

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
    <section>
      <ul>
        {listMinistackArticles.items.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{post.title}</span>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
