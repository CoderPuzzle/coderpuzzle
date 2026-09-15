class Solution:
    def cleanRoom(self, robot: Robot) -> None:
        dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]  # up, right, down, left
        visited = {(0, 0)}
        robot.clean()
        # Iterative spiral DFS (a 100 x 200 grid overflows recursive DFS):
        # a frame is [row, col, entry direction, next relative direction].
        # Invariant: iteration i of the top frame starts with the robot
        # facing (entry + i) % 4, and every iteration ends with exactly one
        # turnRight — either directly (blocked ahead) or deferred, arriving
        # from the child via the back-out sequence below.
        stack = [[0, 0, 0, 0]]
        while stack:
            frame = stack[-1]
            row, col, entry, index = frame
            if index == 4:
                stack.pop()
                if stack:
                    # Back out of the child: about-face, retrace the step,
                    # about-face, then the parent's trailing turnRight into
                    # its next direction.
                    robot.turnRight()
                    robot.turnRight()
                    robot.move()
                    robot.turnRight()
                    robot.turnRight()
                    robot.turnRight()
                continue
            face = (entry + index) % 4
            nrow, ncol = row + dirs[face][0], col + dirs[face][1]
            if (nrow, ncol) not in visited and robot.move():
                visited.add((nrow, ncol))
                robot.clean()
                frame[3] = index + 1
                stack.append([nrow, ncol, face, 0])
            else:
                robot.turnRight()
                frame[3] = index + 1
