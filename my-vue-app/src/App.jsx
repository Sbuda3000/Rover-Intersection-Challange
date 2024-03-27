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
  let [intersections, setIntersections] = useState([]);

  const handleGeneratePlateau = () => {
    if (xPlane > 0 && yPlane > 0) {
      const newPlateau = Array.from({ length: xPlane + 1 }, () =>
        Array.from({ length: yPlane + 1 }, () => "."),
      );
      setPlateau(newPlateau);
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
          position: [yPlane - y, x],
          directions: robotDirections,
        },
      ];

      setRobots(newRobots);
      updatePlateauWithRobots(newRobots);
      setRobotX("");
      setRobotY("");
      setRobotDirections("");
    } else {
      alert(
        "Please enter valid co-ordinates within the plateau dimensions and Please use Capital letters for directions 'N', 'S', 'E', and 'W'.",
      );
    }
  };

  const updatePlateauWithRobots = (robots) => {
    const newPlateau = Array.from({ length: xPlane + 1 }, () =>
      Array.from({ length: yPlane + 1 }, () => "."),
    );

    robots.forEach((robot) => {
      const path = generatePath(robot.directions, robot.position);

      path.forEach(([pathX, pathY], index) => {
        if (index === path.length - 1) {
          newPlateau[pathX][pathY] = "0";
        } else if (index === 0) {
          newPlateau[pathX][pathY] = "X";
        } else if (
          pathX >= 0 &&
          pathX <= xPlane &&
          pathY >= 0 &&
          pathY <= yPlane
        ) {
          newPlateau[pathX][pathY] = "-";
        } else {
          alert("Cannot place robot out of the plateau.");
        }
      });
    });
    setPlateau(newPlateau);
  };

  const generatePath = (directions, initialPosition) => {
    let [x, y] = initialPosition;
    const path = [[x, y]]; //Initialize path with initial position marked as 'X'

    for (let i = 0; i < directions.length; i++) {
      switch (directions[i]) {
        case "N":
          x--;
          break;
        case "S":
          x++;
          break;
        case "E":
          y++;
          break;
        case "W":
          y--;
          break;
        default:
          break;
      }

      path.push([x, y]); // Add each position to the path
    }
    return path;
  };

  const findIntersections = () => {
    const tempIntersections = new Set();

    const allPaths = robots.map((robot) => {
      const path = generatePath(robot.directions, robot.position);
      const pathRelativeToOrigin = path
        .slice(1)
        .map(([x, y]) => [y, xPlane - x]);

      return pathRelativeToOrigin;
    });

    // Loop through each pair of paths in all the paths
    for (let i = 0; i < allPaths.length; i++) {
      const currentPath = allPaths[i];

      for (let j = i + 1; j < allPaths.length; j++) {
        const nextPath = allPaths[j];

        // Loop through each coordinate in the current path
        for (let k = 0; k < currentPath.length; k++) {
          const [x, y] = currentPath[k];

          // Check if the current coordinate exists in the next path
          if (nextPath.some((coord) => coord[0] === x && coord[1] === y)) {
            // If there is a match, add it to the set
            tempIntersections.add(`${x},${y}`);
          }
        }
      }
    }

    intersections = Array.from(tempIntersections, (coord) =>
      coord.split(",").map(Number),
    );
    setIntersections(intersections);
  };

  const isValidDirection = (directions) => {
    const isValidDirections = ["N", "S", "E", "W"];

    return directions
      .split("")
      .every((direction) => isValidDirections.includes(direction));
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
