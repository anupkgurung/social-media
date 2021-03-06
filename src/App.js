import "./App.css";
import { useRoutes } from "react-router-dom"
import { Login, Signup, Home, Authenticate, Explore, Bookmark, Profile } from "./features";
import { Navbar, Toast } from "./component";

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
      <Toast />
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
