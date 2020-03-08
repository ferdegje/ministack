// src/components/ListPosts.js
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from "react";

const listMinistackArticles = gql`
  query listMinistackArticles {
    listMinistackArticles {
      items {
        id,
        title      
      }
    }
  }
`

class MonComposant extends Component {
  render() {
    return (
      <div>
        {
          this.props.posts.map((post, index) => (
            <h2 key={index}>{post.title}</h2>
          ))
        }
      </div>
    )
  }
}

export default graphql(listMinistackArticles, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    posts: props.data.listMinistackArticles ? props.data.listMinistackArticles.items : []
  })
})(MonComposant)
// import React, { Fragment } from "react";

// const ListPosts = () => {

//   return (
//     <Fragment>

//       <h2>THE LIST</h2>
      
//     </Fragment>
//   );
// };

// export default ListPosts;