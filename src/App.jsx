// App.jsx
import Navbar from './components/search/common/Navbar';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App">
      {/* Navbar stays here so it NEVER unmounts during navigation */}
      <Navbar /> 
      <main>
        <AppRouter />
      </main>
    </div>
  );
}
export default App;