## DEMO Link
http://54.164.12.29/


# Rover-Intersection-Challange

We would like you to complete the following Rover Intersection Challenge.

# Problem
A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their onboard cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position is represented by a combination of x and y coordinates. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0 which means the rover is in the bottom left corner.

In order to control a rover, NASA sends a simple string of letters. The possible letters are:

* 'N' (Up),
* 'S' (Down),
* 'E' (Right), and
* 'W' (Left)
which makes the rover move one block in that direction

The movements have the following effect on the rover position:

                                                        N: (x, y + 1)
                                                        S: (x, y - 1)
                                                        E: (x + 1, y)
                                                        W: (x - 1, x)
                                                        
# Input
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0, 0.

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s initial position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers, corresponding to the x and y coordinates.

# Output
The output of the program should be the intersection points of the rovers.

# Run app locally
- cd my-vue-app
- npm install
- npm run dev
