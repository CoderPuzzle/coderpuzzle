import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

class Solution {

    public boolean canMouseWin(String[] grid, int catJump, int mouseJump) {
        // Nothing about a position matters except the two cells and whose
        // turn it is — at most 64*64*2 = 8192 states, so label every state
        // outright: mouse on food is a Mouse win; cat on food or on the
        // mouse is a Cat win. Then work backward with degree counting — a
        // state whose mover can jump into a state already won by that mover
        // inherits the win, and any other labeled successor retires one of
        // its moves, so a state whose last move dies is the opponent's.
        // States never labeled are draws the mouse survives forever without
        // eating, which the 1000-turn rule awards to Cat. Per-cell jump
        // lists (slide up to the limit, stop before the first wall, staying
        // counts) drive both the labeling and its reverse edges.
        int rows = grid.length,
            cols = grid[0].length();
        int[] idx = new int[rows * cols];
        java.util.Arrays.fill(idx, -1);
        int n = 0,
            mouse0 = 0,
            cat0 = 0,
            food = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                char ch = grid[r].charAt(c);
                if (ch != '#') {
                    idx[r * cols + c] = n++;
                    if (ch == 'M') mouse0 = idx[r * cols + c];
                    else if (ch == 'C') cat0 = idx[r * cols + c];
                    else if (ch == 'F') food = idx[r * cols + c];
                }
            }
        }
        int[][] mouseMoves = jumpLists(grid, rows, cols, idx, n, mouseJump);
        int[][] catMoves = jumpLists(grid, rows, cols, idx, n, catJump);
        int[][] mouseBack = reversed(mouseMoves, n);
        int[][] catBack = reversed(catMoves, n);
        int[] label = new int[2 * n * n]; // 0 unknown, 1 Mouse win, 2 Cat win
        int[] degree = new int[2 * n * n];
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int m = 0; m < n; m++) {
            for (int c = 0; c < n; c++) {
                for (int t = 0; t < 2; t++) {
                    int s = (m * n + c) * 2 + t;
                    degree[s] = (t == 0 ? mouseMoves[m] : catMoves[c]).length;
                    if (c == food || m == c) {
                        label[s] = 2;
                        queue.add(s);
                    } else if (m == food) {
                        label[s] = 1;
                        queue.add(s);
                    }
                }
            }
        }
        while (!queue.isEmpty()) {
            int s = queue.poll();
            int t = s & 1,
                m = s >>> 1,
                c = m % n;
            m /= n;
            int win = label[s];
            if (t == 1) {
                for (int m2 : mouseBack[m]) {
                    // predecessors: the mouse just moved
                    int p = (m2 * n + c) * 2;
                    if (label[p] == 0) {
                        if (win == 1) {
                            label[p] = 1;
                            queue.add(p);
                        } else if (--degree[p] == 0) {
                            label[p] = 2;
                            queue.add(p);
                        }
                    }
                }
            } else {
                for (int c2 : catBack[c]) {
                    // predecessors: the cat just moved
                    int p = (m * n + c2) * 2 + 1;
                    if (label[p] == 0) {
                        if (win == 2) {
                            label[p] = 2;
                            queue.add(p);
                        } else if (--degree[p] == 0) {
                            label[p] = 1;
                            queue.add(p);
                        }
                    }
                }
            }
        }
        return label[(mouse0 * n + cat0) * 2] == 1;
    }

    private static int[][] jumpLists(String[] grid, int rows, int cols, int[] idx, int n, int jump) {
        int[] dr = { 0, 0, 1, -1 },
            dc = { 1, -1, 0, 0 };
        int[][] out = new int[n][];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int i = idx[r * cols + c];
                if (i < 0) {
                    continue;
                }
                List<Integer> lst = new ArrayList<>();
                lst.add(i); // staying in place is a move too
                for (int d = 0; d < 4; d++) {
                    for (int s = 1; s <= jump; s++) {
                        int rr = r + dr[d] * s,
                            cc = c + dc[d] * s;
                        if (rr < 0 || rr >= rows || cc < 0 || cc >= cols || grid[rr].charAt(cc) == '#') {
                            break;
                        }
                        lst.add(idx[rr * cols + cc]);
                    }
                }
                out[i] = lst.stream().mapToInt(Integer::intValue).toArray();
            }
        }
        return out;
    }

    private static int[][] reversed(int[][] moves, int n) {
        List<List<Integer>> back = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            back.add(new ArrayList<>());
        }
        for (int i = 0; i < n; i++) {
            for (int j : moves[i]) {
                back.get(j).add(i);
            }
        }
        int[][] out = new int[n][];
        for (int i = 0; i < n; i++) {
            out[i] = back.get(i).stream().mapToInt(Integer::intValue).toArray();
        }
        return out;
    }
}
