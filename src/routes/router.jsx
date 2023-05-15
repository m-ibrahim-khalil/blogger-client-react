import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ErrorPage, HomePage, WithPrivateRoute } from '../includes/components';
import BlogListView from './BlogListView';
import BlogsByAuthor, { loader as blogsByAuthorLoader } from './BlogsByAuthor';
import BlogView, {
  loader as blogLoader,
  action as deleteBlogAction,
} from './BlogView';
import CreateBlog, { action as createBlogAction } from './CreateBlog';
import EditBlog, { action as editAction } from './EditBlog';
import Root, { loader as rootLoader } from './Root';
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
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<Signin />} action={signinAction} />
        <Route path="signup" element={<Signup />} action={signupAction} />
        <Route path="blogs" element={<BlogListView />} loader={rootLoader} />
        <Route
          path="blogs/:blogId"
          element={<BlogView />}
          loader={blogLoader}
          action={deleteBlogAction}
        />
        <Route
          path="blogs/create"
          element={
            <WithPrivateRoute>
              <CreateBlog />
            </WithPrivateRoute>
          }
          action={createBlogAction}
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
          element={
            <WithPrivateRoute>
              <UpdatePassword />
            </WithPrivateRoute>
          }
          action={updatePasswordAction}
        />
      </Route>
    </Route>
  )
);

export default Router;
