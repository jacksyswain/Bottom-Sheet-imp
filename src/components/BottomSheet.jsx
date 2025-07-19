import {  useRef, useState } from 'react';
import { useDrag } from '../hooks/useDrag';
import { animateSpring } from '../utils/spring';
import './BottomSheet.css';

const SNAP_POINTS = {
  CLOSED: window.innerHeight - 90,
  HALF: window.innerHeight / 2,
  FULL: 100,
};

export default function BottomSheet() {
  const sheetRef = useRef(null);
  const handleRef = useRef(null);
  const [position, setPosition] = useState(SNAP_POINTS.CLOSED);
  const [activeTab, setActiveTab] = useState("nearby");

  const snapTo = (value) => {
    animateSpring(position, value, setPosition);
  };

  const findNearestSnap = (value) => {
    const distances = Object.values(SNAP_POINTS).map(p => Math.abs(p - value));
    const closestIndex = distances.indexOf(Math.min(...distances));
    return Object.values(SNAP_POINTS)[closestIndex];
  };

  useDrag(handleRef, (delta) => {
    const newPos = position + delta;
    const snapPoint = findNearestSnap(newPos);
    snapTo(snapPoint);
  }, (delta) => {
    setPosition(prev => Math.min(Math.max(prev + delta, SNAP_POINTS.FULL), SNAP_POINTS.CLOSED));
  });

  return (
    <div
      ref={sheetRef}
      className="bottom-sheet"
      style={{ transform: `translateY(${position}px)` }}
    >
      <div className="handle" ref={handleRef}></div>

      <div className="sheet-header">
        <input type="text" className="search" placeholder="Search locations..." />
        <div className="tabs">
          <button className={activeTab === "nearby" ? "active" : ""} onClick={() => setActiveTab("nearby")}>Nearby</button>
          <button className={activeTab === "saved" ? "active" : ""} onClick={() => setActiveTab("saved")}>Saved</button>
        </div>
      </div>

      <div className="sheet-content">
        {activeTab === "nearby" ? (
          <>
            <div className="item">⛽ Indian Oil – 0.5 km</div>
            <div className="item">🔧 ABC Garage – 1.1 km</div>
            <div className="item">🍽️ Green Garden Café – 1.5 km</div>
            <div className="item">🔧 Raj Auto Works – 2.0 km</div>
          </>
        ) : (
          <>
            <div className="item">⭐ Saved – Fuel Station, Patia</div>
            <div className="item">⭐ Saved – Garage, Cuttack Road</div>
          </>
        )}
      </div>

      <div className="controls">
        <button onClick={() => snapTo(SNAP_POINTS.FULL)}>Full</button>
        <button onClick={() => snapTo(SNAP_POINTS.HALF)}>Half</button>
        <button onClick={() => snapTo(SNAP_POINTS.CLOSED)}>Close</button>
      </div>
    </div>
  );
}