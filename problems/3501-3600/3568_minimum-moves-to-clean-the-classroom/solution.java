import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minMoves(String[] classroom, int energy) {
        // BFS over (cell, collected-litter mask, energy left), one layer per
        // move. best[r * n + c][mask] keeps the largest energy that state was
        // reached with; a new arrival is only worth keeping when it carries
        // strictly more energy, because anything a weaker arrival can finish,
        // a stronger one at the same or smaller depth finishes no later. An
        // 'R' cell restores the tank on arrival, and the search returns the
        // moment a move lands on the last uncollected litter.
        int m = classroom.length;
        int n = classroom[0].length();
        int[][] bits = new int[m][n];
        for (int[] row : bits) {
            Arrays.fill(row, -1);
        }
        int sr = 0,
            sc = 0,
            litter = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (classroom[r].charAt(c) == 'S') {
                    sr = r;
                    sc = c;
                } else if (classroom[r].charAt(c) == 'L') {
                    bits[r][c] = litter++;
                }
            }
        }
        int full = (1 << litter) - 1;
        if (full == 0) {
            return 0;
        }
        int stride = full + 1;
        int[] best = new int[m * n * stride];
        Arrays.fill(best, -1);
        int[] layer = { sr, sc, 0, energy };
        List<int[]> states = new ArrayList<>();
        states.add(layer);
        best[(sr * n + sc) * stride] = energy;
        int moves = 0;
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };
        while (!states.isEmpty()) {
            ++moves;
            List<int[]> nxt = new ArrayList<>();
            for (int[] st : states) {
                int r = st[0],
                    c = st[1],
                    mask = st[2],
                    e = st[3];
                for (int d = 0; d < 4; ++d) {
                    int nr = r + dr[d],
                        nc = c + dc[d];
                    if (nr < 0 || nr >= m || nc < 0 || nc >= n || classroom[nr].charAt(nc) == 'X') {
                        continue;
                    }
                    char ch = classroom[nr].charAt(nc);
                    int ne = ch == 'R' ? energy : e - 1;
                    if (ch != 'R' && ne < 0) {
                        continue; // an empty tank only allows staying on an 'R'
                    }
                    int nmask = ch == 'L' ? mask | (1 << bits[nr][nc]) : mask;
                    if (nmask == full) {
                        return moves;
                    }
                    int idx = (nr * n + nc) * stride + nmask;
                    if (ne > best[idx]) {
                        best[idx] = ne;
                        nxt.add(new int[] { nr, nc, nmask, ne });
                    }
                }
            }
            states = nxt;
        }
        return -1;
    }
}
