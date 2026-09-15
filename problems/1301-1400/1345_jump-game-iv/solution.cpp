class Solution {
  public:
    int minJumps(vector<int> &arr) {
        int n = (int)arr.size();
        // Start is already the target.
        if (n == 1) {
            return 0;
        }
        // One pass groups indices by value so a node's same-value neighbors
        // cost their group size instead of rescanning the array.
        unordered_map<int, vector<int>> indices;
        for (int i = 0; i < n; i++) {
            indices[arr[i]].push_back(i);
        }
        // BFS over the implicit graph (edges i-1, i+1, same-value) gives the
        // minimum step count; -1 doubles as the visited marker.
        vector<int> dist(n, -1);
        dist[0] = 0;
        queue<int> pending;
        pending.push(0);
        while (!pending.empty()) {
            int i = pending.front();
            pending.pop();
            int d = dist[i] + 1;
            vector<int> nexts;
            nexts.push_back(i - 1);
            nexts.push_back(i + 1);
            // Erase the group after use: every index in it just became
            // visited at the same distance, so it can never again produce an
            // unvisited neighbor — without this, all-equal arrays go quadratic.
            auto held = indices.find(arr[i]);
            if (held != indices.end()) {
                for (int j : held->second) {
                    nexts.push_back(j);
                }
                indices.erase(held);
            }
            for (int j : nexts) {
                // Bounds check filters i-1 < 0 and i+1 >= n.
                if (j >= 0 && j < n && dist[j] == -1) {
                    dist[j] = d;
                    // The search ends the moment the last index is labeled.
                    if (j == n - 1) {
                        return d;
                    }
                    pending.push(j);
                }
            }
        }
        return dist[n - 1];
    }
};
