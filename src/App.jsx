import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './routes';
import Spinner from './components/Spinner';


const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            >
              {route.children?.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;