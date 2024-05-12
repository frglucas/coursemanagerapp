import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider, AuthProvider } from './contexts';
import { Private, ROUTES } from './routes';

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route element={<Private />}>
              { ROUTES.PRIVATE.map(({ path, element }, index) => <Route key={`private-route-${index}`} path={path} element={element} />) }
            </Route>
            { ROUTES.PUBLIC.map(({ path, element }, index) => <Route key={`public-route-${index}`} path={path} element={element} />) }
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
