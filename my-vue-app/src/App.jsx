import { useState } from "react";
import "./App.css";

function App() {
  const [xPlane, setX] = useState("");
  const [yPlane, setY] = useState("");
  const [plateau, setPlateau] = useState([]);
  const [robots, setRobots] = useState([]);
  const [robotX, setRobotX] = useState("");
  const [robotY, setRobotY] = useState("");
  const [robotDirections, setRobotDirections] = useState("");
  const [intersections, setIntersections] = useState([]);

  const handleGeneratePlateau = () => {
    if (xPlane > 0 && yPlane > 0) {
      const newPlateau = Array.from({ length: xPlane + 1 }, () =>
        Array.from({ length: yPlane + 1 }, () => "."),
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

  const handleRobotDirectionChange = (e) => {
    setRobotDirections(e.target.value);
  };

  const handleRobotPlacement = () => {
    const x = parseInt(robotX);
    const y = parseInt(robotY);

    if (
      x >= 0 &&
      x <= xPlane &&
      y >= 0 &&
      y <= yPlane &&
      isValidDirection(robotDirections)
    ) {
      const newRobots = [
        ...robots,
        {
          position: [x, y],
          directions: robotDirections,
        },
      ];

      const newPlateau = Array.from({ length: xPlane + 1 }, () =>
        Array.from({ length: yPlane + 1 }, () => "."),
      );

      newRobots.forEach((robot) => {
        const [x, y] = robot.position;
        newPlateau[xPlane - y][x] = "x";
      });

      setPlateau(newPlateau);
      setRobots(newRobots);
      setRobotX("");
      setRobotY("");
      setRobotDirections("");
    } else {
      alert(
        "Please enter valid co-ordinates within the plateau dimensions and Please use Capital letters for directions 'N', 'S', 'E', and 'W'.",
      );
    }
  };

  const generatePath = (directions, initialPosition) => {
    const path = [initialPosition];
    let [x, y] = initialPosition;

    for (let i = 0; i < directions.length; i++) {
      switch (directions[i]) {
        case "N":
          y++;
          break;
        case "S":
          y--;
          break;
        case "E":
          x++;
          break;
        case "W":
          x--;
          break;
        default:
          break;
      }
      path.push([x, y]);
    }
    return path;
  };

  const findIntersections = () => {
    const intersections = [];
    const visited = new Set();

    robots.forEach((robot, index) => {
      const path = generatePath(robot.directions, robot.position);
      path.forEach(([x, y]) => {
        const key = `${x},${y}`;
        if (!visited.has(key)) {
          visited.add(key);
        } else {
          intersections.push([x, y]);
        }
      });
    });

    setIntersections(intersections);
  };

  const isValidDirection = (directions) => {
    const isValidDirections = ["N", "S", "E", "W"];

    return directions.split("").every((dir) => isValidDirections.includes(dir));
  };

  return (
    <>
      <h1>Rover Intersection Challenge</h1>
      <div>
        <div>
          <label>
            X-plane
            <input type="number" value={xPlane} onChange={handleXChange} />
          </label>
          <label>
            Y-plane
            <input type="number" value={yPlane} onChange={handleYChange} />
          </label>
        </div>
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
          <h4>Add robots here with their corresponding directions</h4>
          <div>
            <label>
              Robot X Position
              <input
                type="number"
                value={robotX}
                onChange={handleRobotXChange}
              />
            </label>
            <label>
              Robot Y Position
              <input
                type="number"
                value={robotY}
                onChange={handleRobotYChange}
              />
            </label>
            <label>
              Directions
              <input
                id="directions"
                type="text"
                value={robotDirections}
                onChange={handleRobotDirectionChange}
              />
            </label>
          </div>
          <button onClick={handleRobotPlacement}>Place robot</button>
        </div>

        <button onClick={findIntersections}>Find intersections</button>

        {intersections.length > 0 && (
          <div>
            <h2>Intersection points:</h2>
            <ul>
              {intersections.map((intersection, index) => (
                <li key={index}>
                  Intersection at ({intersection[0]}, {intersection[1]})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
