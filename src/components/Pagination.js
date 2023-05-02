/* eslint-disable react-hooks/exhaustive-deps */
import getBlogs from '../services/blogService';

function pagination(page, setBlogs, size = 10) {
  const blogs = getBlogs(page, size);
  blogs.then(({ payload, currentPage, totalPages, totalItems }) => {
    setBlogs({
      payload,
      currentPage,
      totalPages,
      totalItems,
    });
  });
}

export default pagination;
