class Solution {
  public:
    // BFS in layers, where each layer holds every cell reachable with d
    // moves. Teleports cost 0, so each layer first runs its full closure:
    // the first cell of a letter seen in the layer claims every unvisited
    // cell of that letter. Only then are adjacent cells moved into the
    // next layer — a same-layer teleport must beat a move claimed earlier.
    int minMoves(vector<string> &matrix) {
        int m = matrix.size(), n = matrix[0].size();
        int total = m * n;
        vector<int> dist(total, -1);
        vector<vector<int>> portals(26);
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                char ch = matrix[r][c];
                if (ch >= 'A' && ch <= 'Z') {
                    portals[ch - 'A'].push_back(r * n + c);
                }
            }
        }
        array<bool, 26> used{};
        vector<int> layer = {0};
        vector<int> nxt;
        dist[0] = 0;
        int d = 0;
        while (!layer.empty()) {
            size_t head = 0;
            while (head < layer.size()) {
                int pos = layer[head++];
                char ch = matrix[pos / n][pos % n];
                if (ch >= 'A' && ch <= 'Z' && !used[ch - 'A']) {
                    used[ch - 'A'] = true;
                    for (int q : portals[ch - 'A']) {
                        if (dist[q] == -1) {
                            dist[q] = d;
                            layer.push_back(q);
                        }
                    }
                }
            }
            nxt.clear();
            for (int pos : layer) {
                int r = pos / n, c = pos - r * n;
                if (r > 0 && dist[pos - n] == -1 && matrix[r - 1][c] != '#') {
                    dist[pos - n] = d + 1;
                    nxt.push_back(pos - n);
                }
                if (r + 1 < m && dist[pos + n] == -1 && matrix[r + 1][c] != '#') {
                    dist[pos + n] = d + 1;
                    nxt.push_back(pos + n);
                }
                if (c > 0 && dist[pos - 1] == -1 && matrix[r][c - 1] != '#') {
                    dist[pos - 1] = d + 1;
                    nxt.push_back(pos - 1);
                }
                if (c + 1 < n && dist[pos + 1] == -1 && matrix[r][c + 1] != '#') {
                    dist[pos + 1] = d + 1;
                    nxt.push_back(pos + 1);
                }
            }
            layer.swap(nxt);
            d++;
        }
        return dist[total - 1];
    }
};
