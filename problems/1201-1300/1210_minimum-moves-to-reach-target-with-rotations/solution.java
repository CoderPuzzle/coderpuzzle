import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

class Solution {

    public int minimumMoves(int[][] grid) {
        // State (r, c, horizontal): (r, c) is the upper-left occupied cell;
        // horizontal snakes occupy (r,c) and (r,c+1), vertical (r,c),(r+1,c).
        int n = grid.length;
        ArrayDeque<int[]> queue = new ArrayDeque<>();
        Set<Long> visited = new HashSet<>();
        queue.add(new int[] { 0, 0, 1, 0 });
        visited.add(key(0, 0, 1));
        while (!queue.isEmpty()) {
            int[] state = queue.poll();
            int r = state[0],
                c = state[1],
                horizontal = state[2],
                moves = state[3];
            if (r == n - 1 && c == n - 2 && horizontal == 1) return moves;
            if (horizontal == 1) {
                // Slide right: the new head cell must be empty.
                if (c + 2 < n && grid[r][c + 2] == 0 && visited.add(key(r, c + 1, 1))) {
                    queue.add(new int[] { r, c + 1, 1, moves + 1 });
                }
                // Slide down: both cells of the new row must be empty.
                if (r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0 && visited.add(key(r + 1, c, 1))) {
                    queue.add(new int[] { r + 1, c, 1, moves + 1 });
                }
                // Rotate clockwise: the two cells under the snake must be empty.
                if (r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0 && visited.add(key(r, c, 0))) {
                    queue.add(new int[] { r, c, 0, moves + 1 });
                }
            } else {
                // Slide right: both cells of the new column must be empty.
                if (c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0 && visited.add(key(r, c + 1, 0))) {
                    queue.add(new int[] { r, c + 1, 0, moves + 1 });
                }
                // Slide down: the new tail cell must be empty.
                if (r + 2 < n && grid[r + 2][c] == 0 && visited.add(key(r + 1, c, 0))) {
                    queue.add(new int[] { r + 1, c, 0, moves + 1 });
                }
                // Rotate counterclockwise: the two cells to the right must be empty.
                if (c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0 && visited.add(key(r, c, 1))) {
                    queue.add(new int[] { r, c, 1, moves + 1 });
                }
            }
        }
        return -1;
    }

    private long key(int r, int c, int horizontal) {
        return ((long) r << 20) | ((long) c << 1) | horizontal;
    }
}
