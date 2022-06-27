import "./App.css";
import { useRoutes } from "react-router-dom"
import { Login, Signup, Home, Authenticate, Explore, Bookmark, Profile } from "./features";
import { Navbar } from "./component/Navbar";

function App() {

  let routes = useRoutes([
    {path:"login", element: <Login />},
    {path:"signup", element: <Signup />},
    {path:"/" ,element:<Authenticate/>,
      children : [
        {path:"/", element: <Home />},
        {path:"/explore", element: <Explore />},
        {path:"/bookmark", element: <Bookmark />},
        {path:"/profile", element: <Profile />}
      ]
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
