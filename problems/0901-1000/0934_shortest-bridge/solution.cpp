class Solution {
  public:
    int shortestBridge(vector<vector<int>> &grid) {
        // Scan row-major for the first island and flood it iteratively to
        // collect its cells; then grow a multi-source BFS outward over the
        // water, one layer per flipped 0, until the second island is
        // touched. Iterating rather than recursing is the point — an island
        // can snake through most of a 100 x 100 grid, chaining thousands of
        // cells deep, far past any call stack a submission is granted.
        int n = grid.size();
        vector<vector<bool>> seen(n, vector<bool>(n, false));
        // Cells packed as r * n + c in one flat queue, spanning both phases.
        vector<int> queue(n * n);
        int tail = 0;
        int head = 0;
        bool started = false;
        for (int i = 0; i < n && !started; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] == 1) {
                    seen[i][j] = true;
                    queue[tail++] = i * n + j;
                    started = true;
                    break;
                }
            }
        }
        // A cell is marked when it enters the queue, never when it leaves,
        // so no cell is ever enqueued twice.
        while (head < tail) {
            int cell = queue[head++];
            int r = cell / n;
            int c = cell % n;
            if (r > 0 && grid[r - 1][c] == 1 && !seen[r - 1][c]) {
                seen[r - 1][c] = true;
                queue[tail++] = cell - n;
            }
            if (r + 1 < n && grid[r + 1][c] == 1 && !seen[r + 1][c]) {
                seen[r + 1][c] = true;
                queue[tail++] = cell + n;
            }
            if (c > 0 && grid[r][c - 1] == 1 && !seen[r][c - 1]) {
                seen[r][c - 1] = true;
                queue[tail++] = cell - 1;
            }
            if (c + 1 < n && grid[r][c + 1] == 1 && !seen[r][c + 1]) {
                seen[r][c + 1] = true;
                queue[tail++] = cell + 1;
            }
        }
        // The flood-filled prefix of the queue is BFS layer 0; each further
        // layer is exactly the set of water cells one more flip away, and
        // the first unvisited land met is island 2.
        int flips = 0;
        head = 0; // replay the island-1 prefix as BFS layer 0
        int layerEnd = tail;
        while (head < layerEnd) {
            int nextEnd = layerEnd;
            while (head < layerEnd) {
                int cell = queue[head++];
                int r = cell / n;
                int c = cell % n;
                if (r > 0 && !seen[r - 1][c]) {
                    if (grid[r - 1][c] == 1) {
                        return flips;
                    }
                    seen[r - 1][c] = true;
                    queue[nextEnd++] = cell - n;
                }
                if (r + 1 < n && !seen[r + 1][c]) {
                    if (grid[r + 1][c] == 1) {
                        return flips;
                    }
                    seen[r + 1][c] = true;
                    queue[nextEnd++] = cell + n;
                }
                if (c > 0 && !seen[r][c - 1]) {
                    if (grid[r][c - 1] == 1) {
                        return flips;
                    }
                    seen[r][c - 1] = true;
                    queue[nextEnd++] = cell - 1;
                }
                if (c + 1 < n && !seen[r][c + 1]) {
                    if (grid[r][c + 1] == 1) {
                        return flips;
                    }
                    seen[r][c + 1] = true;
                    queue[nextEnd++] = cell + 1;
                }
            }
            layerEnd = nextEnd;
            ++flips;
        }
        return flips;
    }
};
