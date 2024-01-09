import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './routes/login'
import Dashboard from './routes/dashboard'
import SingIn from './routes/signIn'
import Protected from './protected/protected'
import { NotFound } from './routes/notfound'
import { useLocalStorage } from 'react-use'

function App() {
  const [user, setUser] = useState()
// console.log(user);
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login user={setUser}/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
          <Route path='/SignIn' element={<SingIn/>}></Route>
          <Route element={<Protected user={user}/>}>
            <Route path='/Dashboard' element={<Dashboard user={user} setUser={setUser}/>}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
