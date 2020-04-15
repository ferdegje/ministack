// pages/list.js
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
// import { getDataFromTree } from '@apollo/react-ssr';
import isLoggedIn from '../lib/isLoggedIn';
import AddItem from '../components/AddItem';

const QUERY = gql`
  query listMinistackArticles {
    listMinistackArticles {
      items {
        id,
        title      
      }
    }
  }
`;

const List = () => {
  const { loading, data } = useQuery(QUERY);

  if (!isLoggedIn()) {
      return (
          <span>You need to be logged in to access this content. <a href='api/login'>Log in here</a>.</span>
      )
  }
  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  const items = data.listMinistackArticles.items
  return (<span>{items.map(item=>
    <h1>{item.title}</h1>)}<AddItem /></span>);
};

export default withApollo(List);