import './App.css';
import Read from './components/read';
import Detail from './components/detail';
import Header from './components/header';
import MyPokemon from './components/mypokemon';
import { 
  // BrowserRouter as Router,
  //  Routes, Route,
  createBrowserRouter,
  RouterProvider,
  // Link
  // withRouter
} from 'react-router-dom'
import { 
  // Button,
  Grid
 } from 'semantic-ui-react'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Read />,
  },
  {
    path: "/detail",
    element: <Detail />,
    // element: withRouter(Detail),
  },
  {
    path: "/my-pokemon",
    element: <MyPokemon />
    // element: withRouter(MyPokemon),
  }
]);

function App() {
  return (
    <div className="main">
      <Grid.Row columns={1}>
        <h2 className="main-header">Pokemon</h2>
      </Grid.Row>
      <Grid.Row columns={2} className='mb-10'>
          <Header />
      </Grid.Row>
      <Grid.Row columns={1}>
        <div>
          <RouterProvider 
          router={router} 
          />
        </div>
      </Grid.Row>
      
    </div>
    
  );
}

export default App;