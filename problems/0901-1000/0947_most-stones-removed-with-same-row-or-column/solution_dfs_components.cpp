class Solution {
  public:
    int removeStones(vector<vector<int>> &stones) {
        // Row-or-column adjacency splits the stones into connected
        // components, and a component of k stones gives up k - 1 of them, so
        // the answer is n minus the number of components. Rather than encode
        // the merging, walk it: bucket the stone indices by row and by
        // column, then depth-first search from every stone not yet reached,
        // expanding through both of its buckets. Each bucket is erased the
        // first time it is expanded, so the whole shared line is absorbed at
        // once and no bucket is ever scanned twice.
        int n = stones.size();
        unordered_map<int, vector<int>> rows, cols;
        for (int i = 0; i < n; i++) {
            rows[stones[i][0]].push_back(i);
            cols[stones[i][1]].push_back(i);
        }

        vector<char> visited(n, 0);
        vector<int> stack;
        int components = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start])
                continue;
            components++;
            visited[start] = 1;
            stack.push_back(start);
            while (!stack.empty()) {
                int u = stack.back();
                stack.pop_back();
                for (int axis = 0; axis < 2; axis++) {
                    unordered_map<int, vector<int>> &bucket = axis == 0 ? rows : cols;
                    auto it = bucket.find(stones[u][axis]);
                    if (it == bucket.end())
                        continue;
                    for (int v : it->second) {
                        if (!visited[v]) {
                            visited[v] = 1;
                            stack.push_back(v);
                        }
                    }
                    bucket.erase(it);
                }
            }
        }

        return n - components;
    }
};
