class Solution {
  public:
    vector<int> maxPoints(vector<vector<int>> &grid, vector<int> &queries) {
        int m = grid.size(), n = grid[0].size();
        int qlen = queries.size();
        // A query q scores exactly the cells reachable from (0,0) through
        // values < q; that set only grows with q, so answer queries in
        // ascending order against one shared frontier.
        vector<int> order(qlen);
        for (int i = 0; i < qlen; i++)
            order[i] = i;
        sort(order.begin(), order.end(), [&](int a, int b) { return queries[a] < queries[b]; });
        vector<int> answer(qlen, 0);
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        visited[0][0] = true;
        // Min-heap frontier keyed by cell value; the start cell is marked
        // visited up front so it must be earned by the pop loop like any other.
        typedef tuple<int, int, int> Cell;
        priority_queue<Cell, vector<Cell>, greater<Cell>> heap;
        heap.push({grid[0][0], 0, 0});
        int count = 0;
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        for (int idx : order) {
            int q = queries[idx];
            // Pop while the cheapest frontier cell is strictly below q: this
            // is Dijkstra-like expansion in value order, one point per cell.
            while (!heap.empty() && get<0>(heap.top()) < q) {
                auto [val, r, c] = heap.top();
                heap.pop();
                count += 1;
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d], nc = c + dc[d];
                    if (0 <= nr && nr < m && 0 <= nc && nc < n && !visited[nr][nc]) {
                        // Mark at push time: no duplicate entries, so each
                        // cell enters and leaves the heap exactly once.
                        visited[nr][nc] = true;
                        heap.push({grid[nr][nc], nr, nc});
                    }
                }
            }
            // Heap min >= q (or empty): nothing further is reachable for this
            // or any smaller remaining query, so the running count answers it.
            answer[idx] = count;
        }
        return answer;
    }
};
