// pages/list.js
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
// import { getDataFromTree } from '@apollo/react-ssr';

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

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  const items = data.listMinistackArticles.items
  return (<span>{items.map(item=>
    <h1>{item.title}</h1>)}</span>);
};

export default withApollo(List);