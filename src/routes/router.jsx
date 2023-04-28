import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorPage from '../components/Pages/ErrorPage';
import HomePage from '../components/Pages/HomePage';
import WithPrivateRoute from '../hooks/WithPrivateRoute';
import Signin, { action as signinAction } from './Signin';
import Signup, { action as signupAction } from './Signup';
import Blog, { loader as blogLoader, action as deleteBlogAction } from './blog';
import EditBlog, { action as editAction } from './blogEdit';
import BlogsByAuthor, { loader as blogsByAuthorLoader } from './blogsByAuthor';
import Root, { action as rootAction, loader as rootLoader } from './root';
import UpdatePassword, {
  action as updatePasswordAction,
} from './updatePassword';
import User, { action as deleteUserAction, loader as userLoader } from './user';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index path="home" element={<HomePage />} />
        <Route path="signin" element={<Signin />} action={signinAction} />
        <Route path="signup" element={<Signup />} action={signupAction} />
        <Route
          path="blogs/:blogId"
          element={<Blog />}
          loader={blogLoader}
          action={deleteBlogAction}
        />
        <Route
          path="blogs/:blogId/edit"
          element={
            <WithPrivateRoute>
              <EditBlog />
            </WithPrivateRoute>
          }
          loader={blogLoader}
          action={editAction}
        />
        <Route
          path="users/:username/"
          element={<User />}
          loader={userLoader}
          action={deleteUserAction}
        />
        <Route
          path="users/:username/update"
          element={<UpdatePassword />}
          action={updatePasswordAction}
        />
        <Route
          path="users/:username/blogs/:authorId"
          element={<BlogsByAuthor />}
          loader={blogsByAuthorLoader}
        />
      </Route>
    </Route>
  )
);

export default router;
