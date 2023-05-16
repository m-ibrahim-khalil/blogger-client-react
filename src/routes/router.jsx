import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Suspense } from 'react';
import {
  ErrorPage,
  HomePage,
  WithPrivateRoute,
  NotFoundPage,
  Spinner,
} from '../includes/components';
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
    <Route
      path="/"
      element={
        <Suspense fallback={<Spinner />}>
          <Root />
        </Suspense>
      }
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="signin"
          element={
            <Suspense fallback={<Spinner />}>
              <Signin />
            </Suspense>
          }
          action={signinAction}
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<Spinner />}>
              <Signup />
            </Suspense>
          }
          action={signupAction}
        />
        <Route
          path="blogs"
          element={
            <Suspense fallback={<Spinner />}>
              <BlogListView />
            </Suspense>
          }
          loader={rootLoader}
        />
        <Route
          path="blogs/:blogId"
          element={
            <Suspense fallback={<Spinner />}>
              <BlogView />
            </Suspense>
          }
          loader={blogLoader}
          action={deleteBlogAction}
        />
        <Route
          path="blogs/create"
          element={
            <WithPrivateRoute>
              <Suspense fallback={<Spinner />}>
                <CreateBlog />
              </Suspense>
            </WithPrivateRoute>
          }
          action={createBlogAction}
        />
        <Route
          path="blogs/:blogId/edit"
          element={
            <WithPrivateRoute>
              <Suspense fallback={<Spinner />}>
                <EditBlog />
              </Suspense>
            </WithPrivateRoute>
          }
          loader={blogLoader}
          action={editAction}
        />

        <Route
          path="users/:username/"
          element={
            <Suspense fallback={<Spinner />}>
              <User />
            </Suspense>
          }
          loader={userLoader}
          action={deleteUserAction}
        >
          <Route
            path="blogs/:authorId"
            element={
              <Suspense fallback={<Spinner />}>
                <BlogsByAuthor />
              </Suspense>
            }
            loader={blogsByAuthorLoader}
          />
        </Route>
        <Route
          path="users/:username/update"
          element={
            <WithPrivateRoute>
              <Suspense fallback={<Spinner />}>
                <UpdatePassword />
              </Suspense>
            </WithPrivateRoute>
          }
          action={updatePasswordAction}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default Router;
