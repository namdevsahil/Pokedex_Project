import './App.css'
import CustomRoutes from './Components/Routes/CustomeRoutes';
import { Link } from 'react-router-dom';

function App() {
  
  return (
    <div>
      <h1 id="pokedex-heading">
          <Link to="/">Pokedex</Link>
      </h1>
      < CustomRoutes />
    </div>
  )
}

export default App;
