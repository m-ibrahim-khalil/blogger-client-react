import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import WithPrivateRoute from '../components/HOC/WithPrivateRoute';
import ErrorPage from '../components/Pages/ErrorPage';
import HomePage from '../components/Pages/HomePage';
import BlogsByAuthor, { loader as blogsByAuthorLoader } from './BlogsByAuthor';
import BlogView, {
  loader as blogLoader,
  action as deleteBlogAction,
} from './BlogView';
import EditBlog, { action as editAction } from './EditBlog';
import Root, { action as rootAction, loader as rootLoader } from './Root';
import Signin, { action as signinAction } from './Signin';
import Signup, { action as signupAction } from './Signup';
import UpdatePassword, {
  action as updatePasswordAction,
} from './UpdatePassword';
import User, {
  action as deleteUserAction,
  loader as userLoader,
} from './UserView';

const Router = createBrowserRouter(
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
          element={<BlogView />}
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
        >
          <Route
            path="blogs/:authorId"
            element={<BlogsByAuthor />}
            loader={blogsByAuthorLoader}
          />
        </Route>
        <Route
          path="users/:username/update"
          element={<UpdatePassword />}
          action={updatePasswordAction}
        />
      </Route>
    </Route>
  )
);

export default Router;
