import { useRoutes } from "react-router-dom"

import UserList from "./pages/UserList"
import UserEdit from "./pages/UserEdit"

function App() {

  const element = useRoutes([
    { path: '/', element: <UserList /> },
    { path: '/create', element: <UserEdit /> },
    { path: '/edit/:id', element: <UserEdit /> },
  ])

  return element
}

export default App
