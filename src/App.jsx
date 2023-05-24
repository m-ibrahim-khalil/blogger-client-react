import { RouterProvider } from 'react-router-dom';
import Router from './routes/router';

function App() {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
