import "./App.css";
import { useRoutes } from "react-router-dom"
import { Login, Signup, Home, Authenticate } from "./features";
import { Navbar } from "./component/Navbar";

function App() {

  let routes = useRoutes([
    {path:"login", element: <Login />},
    {path:"signup", element: <Signup />},
    {path:"/" ,element:<Authenticate/>,
      children : 
        {path:"/", element: <Home />}
    }
  ])

  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
