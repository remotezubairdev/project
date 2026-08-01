import { Routes, Route } from 'react-router-dom';

// Pages for Routes
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
// Components
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Contexts
import AuthContextProvider from './context/AuthContext';
import Goals from './pages/Goals';
import Goal from './pages/Goal';

const App = () => {
  return (
    <AuthContextProvider>
      <main className='font-poppins'>
        <Sidebar />
        <div className='xl:p-32 p-4'>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/goals' element={<Goals />}>
                <Route path='/goals/:id' element={<Goal />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </main>
    </AuthContextProvider>
  )
}

export default App