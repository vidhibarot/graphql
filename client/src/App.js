import logo from './logo.svg';
import './App.css';
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// we use this in index file 
import { gql, useQuery } from '@apollo/client';


// const client = new ApolloClient({
//   uri: 'https://localhost:8000/graphql',//backend server link
//   cache: new InMemoryCache(),//memory cash
// });// we describe use it in index file

// const query = `query getAllTodods{
//   getTodos {
//     title
//     userId
//     completed
//     user{
//       name
//       id
//     }
//   }

// }` //This query we arite when we describe apollo cleint in app but after this we write in index file 

// using gql query
const findData = gql`query getAllTodods{
  getTodos {
    title
    userId
    completed
    user{
      name
      id
    }
  }
  
}`
function App() {
  // for getData fron query we use this use query and if take more time for fetch data that time get pending and set loading page
  const { data, pending } = useQuery(findData)
  console.log("data is thette>>", data)
  // also check karvu k data male chhe k nai 
  if (pending) return <h1>Loading.........</h1>
  return (
    <div className="App">
      <div>{JSON.stringify(data)}</div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
