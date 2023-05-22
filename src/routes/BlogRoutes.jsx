import { Routes, Route } from 'react-router-dom';
import { BlogsLayout } from '../components/layouts';
import { NotFoundPage } from '../components/Pages';

export default function BlogRoutes() {
  return (
    <Routes>
      <Route element={<BlogsLayout />}>
        <Route index element={<h1>Recent Blogs</h1>} />
        <Route path=":id" element={<h1>Single Blog</h1>} />
        <Route path=":id/edit" element={<h1>Edit Blog</h1>} />
        <Route path="new" element={<h1>Create Blogs</h1>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
