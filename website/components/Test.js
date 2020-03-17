import Card from 'react-bootstrap/Card'
import createApolloClient from '../apolloClient'

createApolloClient();

export default function Test() {
  return (
    <Card>
        <Card.Body>TEST</Card.Body>
    </Card>
  )
}
