class Solution {
  public:
    int longestCycle(vector<int> &edges) {
        int n = (int)edges.size();
        // Three colors: 0 = unvisited, 1 = on the current walk, 2 = finished.
        vector<int> color(n, 0), step(n, 0);
        int timer = 1;
        int best = -1;
        for (int start = 0; start < n; start++) {
            if (color[start])
                continue;
            int node = start;
            vector<int> path;
            // Out-degree <= 1 means rho shapes: walk until dead-end (-1),
            // a finished node, or a node on the current walk (a cycle).
            while (node != -1 && color[node] == 0) {
                color[node] = 1;
                step[node] = timer;
                timer += 1;
                path.push_back(node);
                node = edges[node];
            }
            // Landing on color 1 means we looped back into this walk; the
            // cycle length is the steps taken since that node was stamped.
            if (node != -1 && color[node] == 1) {
                best = max(best, timer - step[node]);
            }
            // Mark the whole walk finished so later starts never re-walk it.
            for (int v : path)
                color[v] = 2;
        }
        return best;
    }
};
