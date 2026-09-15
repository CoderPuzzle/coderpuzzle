import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private static final String TARGET = "123450";
    // Adjacency of each row-major cell on the 2x3 board, so the
    // expansion needs no bounds logic.
    private static final int[][] NEIGHBORS = { { 1, 3 }, { 0, 2, 4 }, { 1, 5 }, { 0, 4 }, { 3, 5, 1 }, { 2, 4 } };

    public int slidingPuzzle(int[][] board) {
        // Boards are nodes, slides of the 0 are edges: BFS gives the
        // minimum move count over at most 6! = 720 states, encoded as
        // strings so they hash into a visited set.
        StringBuilder sb = new StringBuilder();
        for (int[] row : board) {
            for (int v : row) {
                sb.append(v);
            }
        }
        String start = sb.toString();
        if (start.equals(TARGET)) {
            return 0;
        }
        Set<String> visited = new HashSet<>();
        visited.add(start);
        Deque<Object[]> queue = new ArrayDeque<>();
        queue.add(new Object[] { start, 0 });
        while (!queue.isEmpty()) {
            Object[] head = queue.poll();
            String state = (String) head[0];
            int moves = (Integer) head[1];
            int zero = state.indexOf('0');
            for (int nxt : NEIGHBORS[zero]) {
                // Swap the 0 with a neighboring tile to make a successor.
                char[] chars = state.toCharArray();
                char tmp = chars[zero];
                chars[zero] = chars[nxt];
                chars[nxt] = tmp;
                String newState = new String(chars);
                if (newState.equals(TARGET)) {
                    return moves + 1;
                }
                // add() reports novelty, so each state expands once.
                if (visited.add(newState)) {
                    queue.add(new Object[] { newState, moves + 1 });
                }
            }
        }
        // Queue exhausted: the target sits in the unreachable half of the
        // permutations (odd parity).
        return -1;
    }
}
