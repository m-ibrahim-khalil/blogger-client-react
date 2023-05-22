import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, NotFoundPage } from './includes/components';
import BlogRoutes from './routes/BlogRoutes';
import UserRoutes from './routes/UserRoutes';
import SignIn from './components/Pages/Signin';
import SignUp from './components/Pages/Signup';
import Navbar from './components/layouts/NavBar';

function App() {
  return (
    <Router>
      {/* <MenuAppBar /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blogs/*" element={<BlogRoutes />} />
        <Route path="/users/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
