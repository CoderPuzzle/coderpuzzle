class Solution {
  public:
    string findShortestWay(vector<vector<int>> &maze, vector<int> &ball, vector<int> &hole) {
        int m = maze.size(), n = maze[0].size();
        int hr = hole[0], hc = hole[1];
        vector<vector<int>> dist(m, vector<int>(n, -1));
        vector<vector<string>> path(m, vector<string>(n));
        // min-heap of (d, instructions, r, c) — tuple order compares
        // distance first, then the instruction string
        priority_queue<tuple<int, string, int, int>, vector<tuple<int, string, int, int>>,
                       greater<tuple<int, string, int, int>>>
            heap;
        // Dijkstra over stopping cells, but the hole is a terminal that
        // captures the ball mid-roll. States carry (distance, instructions)
        // and the heap orders by distance first, string second, so the first
        // time the hole pops, its pair is distance-minimal and, among those,
        // lexicographically minimal.
        dist[ball[0]][ball[1]] = 0;
        heap.push({0, "", ball[0], ball[1]});
        int dr[4] = {1, 0, 0, -1};
        int dc[4] = {0, -1, 1, 0};
        const string letters = "dlru";
        while (!heap.empty()) {
            auto [d, p, r, c] = heap.top();
            heap.pop();
            // Dijkstra settles cells in (distance, instructions) order:
            // hole popped => its pair is final.
            if (r == hr && c == hc)
                return p;
            // Stale heap entry (cell was already relaxed smaller): skip.
            if (d > dist[r][c] || (d == dist[r][c] && p > path[r][c]))
                continue;
            // The "next direction must differ from the last" rule needs no
            // code: the ball stopped against a wall in that direction, so
            // re-choosing it rolls zero cells.
            for (int dir = 0; dir < 4; dir++) {
                // Roll until the next cell is a wall/border — but stepping
                // onto the hole ends the roll right there: the ball drops
                // in instead of rolling on.
                int nr = r, nc = c, steps = 0;
                while (nr + dr[dir] >= 0 && nr + dr[dir] < m && nc + dc[dir] >= 0 && nc + dc[dir] < n &&
                       maze[nr + dr[dir]][nc + dc[dir]] == 0) {
                    nr += dr[dir];
                    nc += dc[dir];
                    steps++;
                    if (nr == hr && nc == hc)
                        break;
                }
                if (steps > 0) {
                    int nd = d + steps;
                    string np = p + letters[dir];
                    // Relax on the (distance, instructions) pair.
                    if (dist[nr][nc] == -1 || nd < dist[nr][nc] || (nd == dist[nr][nc] && np < path[nr][nc])) {
                        dist[nr][nc] = nd;
                        path[nr][nc] = np;
                        heap.push({nd, np, nr, nc});
                    }
                }
            }
        }
        // Heap exhausted: the ball can never reach the hole.
        return "impossible";
    }
};
