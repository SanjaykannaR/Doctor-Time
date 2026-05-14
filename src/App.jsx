// App.jsx
import { useLocation } from 'react-router-dom';
import Navbar from './components/search/common/Navbar';
import AppRouter from './routes/AppRouter';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <main>
        <AppRouter />
      </main>
    </div>
  );
}
export default App;
