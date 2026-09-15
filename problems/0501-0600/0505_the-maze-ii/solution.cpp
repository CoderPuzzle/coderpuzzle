class Solution {
  public:
    int shortestDistance(vector<vector<int>> &maze, vector<int> &start, vector<int> &destination) {
        int m = maze.size(), n = maze[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        dist[start[0]][start[1]] = 0;
        heap.push({0, start[0] * n + start[1]});
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        // Dijkstra over stopping cells — positions where the ball halts
        // against a wall/border. Roll distances vary, so BFS won't do.
        while (!heap.empty()) {
            pair<int, int> top = heap.top();
            heap.pop();
            int d = top.first;
            int r = top.second / n, c = top.second % n;
            // Dijkstra settles cells in distance order: destination popped
            // => its distance is final.
            if (r == destination[0] && c == destination[1])
                return d;
            // Stale heap entry (cell was already relaxed lower): skip.
            if (d > dist[r][c])
                continue;
            for (int dir = 0; dir < 4; dir++) {
                // Roll step by step until the next cell is a wall or out of
                // bounds; the landing cell is the neighbor, steps the edge
                // weight. Passing over a cell doesn't create a node — only
                // stopping on it does.
                int nr = r, nc = c, steps = 0;
                while (nr + dr[dir] >= 0 && nr + dr[dir] < m && nc + dc[dir] >= 0 && nc + dc[dir] < n &&
                       maze[nr + dr[dir]][nc + dc[dir]] == 0) {
                    nr += dr[dir];
                    nc += dc[dir];
                    steps++;
                }
                if (steps > 0) {
                    int nd = d + steps;
                    // Relax only when the roll improves the landing cell.
                    if (dist[nr][nc] == -1 || nd < dist[nr][nc]) {
                        dist[nr][nc] = nd;
                        heap.push({nd, nr * n + nc});
                    }
                }
            }
        }
        // Heap exhausted: the ball can never stop on the destination.
        return -1;
    }
};
