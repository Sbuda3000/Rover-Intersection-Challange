import { useState } from "react";
import "./App.css";

function App() {
  const [xPlane, setX] = useState(0);
  const [yPlane, setY] = useState(0);
  const [plateau, setPlateau] = useState([]);
  const [robots, setRobots] = useState([]);
  const [robotX, setRobotX] = useState("");
  const [robotY, setRobotY] = useState("");

  const handleGeneratePlateau = () => {
    if (xPlane > 0 && yPlane > 0) {
      const newPlateau = Array.from({ length: xPlane }, () =>
        Array.from({ length: yPlane }, () => "."),
      );
      setPlateau(newPlateau);
      setRobots([]);
    } else {
      alert(
        "Co-ordinates must be greater than 0, otherwise our robots will fall off the plateau",
      );
    }
  };

  const handleXChange = (e) => {
    setX(parseInt(e.target.value));
  };
  const handleYChange = (e) => {
    setY(parseInt(e.target.value));
  };

  const handleRobotXChange = (e) => {
    setRobotX(parseInt(e.target.value));
  };
  const handleRobotYChange = (e) => {
    setRobotY(parseInt(e.target.value));
  };

  const handleRobotPlacement = () => {
    const x = parseInt(robotX);
    const y = parseInt(robotY);

    if (x >= 0 && x <= xPlane && y >= 0 && y <= yPlane) {
      const newArray = plateau.map((xPlane, xIndex) =>
        xPlane.map((yPlane, yIndex) =>
          x === xIndex && y === yIndex ? "X" : yPlane,
        ),
      );
      setPlateau(newArray);
      setRobotX("");
      setRobotY("");
    } else {
      alert("Please enter valid co-ordinates within the plateau dimensions");
    }
  };

  return (
    <>
      <div>
        <label>
          X-plane
          <input type="number" value={xPlane} onChange={handleXChange} />
        </label>
        <label>
          Y-plane
          <input type="number" value={yPlane} onChange={handleYChange} />
        </label>
        <button onClick={handleGeneratePlateau}>Generate plateau</button>

        <div>
          <h2>Generated plateau</h2>
          <table>
            <tbody>
              {plateau.map((xPlane, xIndex) => (
                <tr key={xIndex}>
                  {xPlane.map((yPlane, yIndex) => (
                    <td key={yIndex}>{yPlane}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <label>
            Robot X
            <input type="number" value={robotX} onChange={handleRobotXChange} />
          </label>
          <label>
            Robot Y
            <input type="number" value={robotY} onChange={handleRobotYChange} />
          </label>
          <button onClick={handleRobotPlacement}>Place robot</button>
        </div>
      </div>
    </>
  );
}

export default App;
