import './App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Login from './pages/login/Login';
import ROUTES,{ RenderRoutes} from './routes'
function App() {
  
  return (
    <div className="App">
     < RenderRoutes routes={ROUTES}/>
    </div>
  );
}

export default App;
