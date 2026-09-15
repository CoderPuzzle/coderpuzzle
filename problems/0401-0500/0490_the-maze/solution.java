import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        // The ball begins at rest, so the start cell is itself a stopping
        // position and seeds the queue.
        Deque<int[]> queue = new ArrayDeque<>();
        boolean[][] stopped = new boolean[maze.length][maze[0].length];
        queue.add(new int[] { start[0], start[1] });
        stopped[start[0]][start[1]] = true;
        int[][] directions = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            if (cell[0] == destination[0] && cell[1] == destination[1]) {
                return true;
            }
            // A roll is deterministic, so each stop has at most four
            // successors — the rest cells of its four rolls — and every
            // one of them is scheduled exactly once.
            for (int[] direction : directions) {
                int[] rest = roll(maze, cell[0], cell[1], direction[0], direction[1]);
                if (!stopped[rest[0]][rest[1]]) {
                    stopped[rest[0]][rest[1]] = true;
                    queue.add(rest);
                }
            }
        }
        return false;
    }

    private int[] roll(int[][] maze, int row, int col, int dr, int dc) {
        while (true) {
            int nextRow = row + dr;
            int nextCol = col + dc;
            if (nextRow < 0 || nextRow >= maze.length || nextCol < 0 || nextCol >= maze[0].length) {
                break;
            }
            // The border acts as a wall, so leaving the grid ends the roll
            // just like a 1 cell does.
            if (maze[nextRow][nextCol] == 1) {
                break;
            }
            row = nextRow;
            col = nextCol;
        }
        return new int[] { row, col };
    }
}
