import { 
    // BrowserRouter as Router,
    // Link,
    // NavLink,
    // RouterProvider,
    // useNavigate
    // withRouter
} from 'react-router-dom'

// import Read from './read';
// import MyPokemon from './mypokemon';

import { 
    // Button,
    // Grid
} from 'semantic-ui-react'


export default function Header() {

    // let navigate = useNavigate();


    return (
        <div>
            <a href='/' className='button red-color'>
                List Pokemon
            </a>

            <a href='/my-pokemon' className='button blue-color'>
                My Pokemon List
            </a>

        </div>

    )

}
  