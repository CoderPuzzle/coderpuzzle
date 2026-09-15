class Solution {
  public:
    vector<int> numIslands2(int m, int n, vector<vector<int>> &positions) {
        // Union-find over flattened cell ids r * n + c keeps the island count
        // incremental; no full grid rescan after each add-land.
        vector<int> parent(m * n);
        vector<int> size(m * n, 1);
        vector<bool> land(m * n, false);
        for (int i = 0; i < m * n; i++) {
            parent[i] = i;
        }
        vector<int> answer;
        answer.reserve(positions.size());
        int count = 0;
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        for (auto &pos : positions) {
            int r = pos[0], c = pos[1];
            int cell = r * n + c;
            // A repeated position changes nothing; re-emit the current count.
            if (land[cell]) {
                answer.push_back(count);
                continue;
            }
            // The new land starts as its own island before any merges.
            land[cell] = true;
            count++;
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || !land[nr * n + nc]) {
                    continue;
                }
                // Distinct roots mean two islands merge, losing one count; a
                // later neighbor of the same island re-finds the merged root,
                // so no extra decrement sneaks in.
                int ra = find(parent, cell);
                int rb = find(parent, nr * n + nc);
                if (ra != rb) {
                    // Union by size: attach the smaller tree underneath.
                    if (size[ra] < size[rb]) {
                        swap(ra, rb);
                    }
                    parent[rb] = ra;
                    size[ra] += size[rb];
                    count--;
                }
            }
            answer.push_back(count);
        }
        return answer;
    }

  private:
    int find(vector<int> &parent, int x) {
        // Path halving: splice x onto its grandparent, flattening chains.
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
