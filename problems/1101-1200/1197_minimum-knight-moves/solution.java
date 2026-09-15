import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private static final int[][] MOVES = {
        { 1, 2 },
        { 2, 1 },
        { 2, -1 },
        { 1, -2 },
        { -1, -2 },
        { -2, -1 },
        { -2, 1 },
        { -1, 2 },
    };

    public int minKnightMoves(int x, int y) {
        // Mirror symmetry folds every target into the first quadrant; a
        // knight never needs to leave the window two squares past it.
        int tx = Math.abs(x),
            ty = Math.abs(y);
        Set<Long> seen = new HashSet<>();
        seen.add(0L);
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { 0, 0 });
        int steps = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int s = 0; s < size; s++) {
                int[] cell = queue.poll();
                if (cell[0] == tx && cell[1] == ty) {
                    return steps;
                }
                for (int[] m : MOVES) {
                    int nx = cell[0] + m[0],
                        ny = cell[1] + m[1];
                    long key = ((long) (nx + 400) << 20) | (ny + 400);
                    if (-2 <= nx && nx <= tx + 2 && -2 <= ny && ny <= ty + 2 && seen.add(key)) {
                        queue.add(new int[] { nx, ny });
                    }
                }
            }
            steps++;
        }
        throw new AssertionError("unreachable");
    }
}
