import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private static final int[][] DIRS = { { -1, 0 }, { 0, 1 }, { 1, 0 }, { 0, -1 } }; // up, right, down, left

    public void cleanRoom(Robot robot) {
        Set<Long> visited = new HashSet<>();
        visited.add(key(0, 0));
        robot.clean();
        // Iterative spiral DFS: a frame is {row, col, entry direction, next
        // relative direction}. Invariant: iteration i of the top frame starts
        // with the robot facing (entry + i) % 4, and every iteration ends
        // with exactly one turnRight — either directly (blocked ahead) or
        // deferred, arriving from the child via the back-out sequence below.
        Deque<int[]> stack = new ArrayDeque<>(); // row, col, entry, next i
        stack.push(new int[] { 0, 0, 0, 0 });
        while (!stack.isEmpty()) {
            int[] frame = stack.peek();
            int row = frame[0],
                col = frame[1],
                entry = frame[2],
                index = frame[3];
            if (index == 4) {
                stack.pop();
                if (!stack.isEmpty()) {
                    // Back out of the child: about-face, retrace the step,
                    // about-face, then the parent's trailing turnRight into
                    // its next direction.
                    robot.turnRight();
                    robot.turnRight();
                    robot.move();
                    robot.turnRight();
                    robot.turnRight();
                    robot.turnRight();
                }
                continue;
            }
            int face = (entry + index) % 4;
            int nrow = row + DIRS[face][0],
                ncol = col + DIRS[face][1];
            if (!visited.contains(key(nrow, ncol)) && robot.move()) {
                visited.add(key(nrow, ncol));
                robot.clean();
                frame[3] = index + 1;
                stack.push(new int[] { nrow, ncol, face, 0 });
            } else {
                robot.turnRight();
                frame[3] = index + 1;
            }
        }
    }

    private static long key(int row, int col) {
        return ((long) (row + 256) << 16) | (col + 256);
    }
}
