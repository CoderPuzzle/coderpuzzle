import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minFlips(int[][] mat) {
        // Pack the matrix into one integer; flipping cell i XORs the state
        // with its cross-shaped flip mask. Order never matters and flipping
        // a cell twice cancels, so the reachable states form one graph per
        // start state and BFS over it gives the minimum step count.
        int m = mat.length;
        int n = mat[0].length;
        int start = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (mat[r][c] == 1) {
                    start |= 1 << (r * n + c);
                }
            }
        }
        if (start == 0) {
            return 0;
        }
        int[] masks = new int[m * n];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int mask = 1 << (r * n + c);
                int[][] deltas = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
                for (int[] d : deltas) {
                    int nr = r + d[0];
                    int nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                        mask |= 1 << (nr * n + nc);
                    }
                }
                masks[r * n + c] = mask;
            }
        }
        boolean[] seen = new boolean[1 << (m * n)];
        List<Integer> frontier = new ArrayList<>();
        frontier.add(start);
        seen[start] = true;
        int steps = 0;
        while (!frontier.isEmpty()) {
            steps++;
            List<Integer> next = new ArrayList<>();
            for (int state : frontier) {
                for (int mask : masks) {
                    int nstate = state ^ mask;
                    if (nstate == 0) {
                        return steps;
                    }
                    if (!seen[nstate]) {
                        seen[nstate] = true;
                        next.add(nstate);
                    }
                }
            }
            frontier = next;
        }
        return -1;
    }
}
