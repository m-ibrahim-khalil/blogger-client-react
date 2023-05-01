/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import getBlogs from '../services/blogService';

function usePaginate(page, size = 10) {
  const [data, setData] = useState({
    payload: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });

  useEffect(() => {
    const blogs = getBlogs(page, size);
    blogs.then((blog) => {
      setData({
        ...blog,
      });
    });
  }, [page, size]);

  return data;
}

export default usePaginate;
