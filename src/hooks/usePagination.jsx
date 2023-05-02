// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from 'react';
// import getBlogs from '../services/blogService';

// function usePaginate(page, setBlogs, size = 10) {
//   useEffect(() => {
//     const blogs = getBlogs(page, size);
//     blogs.then(({ payload, currentPage, totalPages, totalItems }) => {
//       setBlogs({
//         payload,
//         currentPage,
//         totalPages,
//         totalItems,
//       });
//     });
//   }, [page, size]);
// }

// export default usePaginate;
