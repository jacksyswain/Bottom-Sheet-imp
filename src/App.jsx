import { useState } from 'react';
import BottomSheet from './components/BottomSheet';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo"> Ride Amigo</div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Explore</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </nav>

      <header className="header">
        <h1> Nearby Explorer</h1>
        <p>Find gas stations, garages, and food spots near you</p>
      </header>

      <main className="main-content">
        <div className="card">
          <h3>Garage</h3>
          <p>Locate nearby garages for quick repair help.</p>
        </div>
        <div className="card">
          <h3> Fuel Station</h3>
          <p>Check distance to the nearest fuel stations.</p>
        </div>
        <div className="card">
          <h3>Restaurants</h3>
          <p>Search eateries open near you.</p>
        </div>
      </main>

      <BottomSheet />
    </div>
  );
}

export default App;