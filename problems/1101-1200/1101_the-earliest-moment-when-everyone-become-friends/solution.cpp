class Solution {
  public:
    int earliestAcq(vector<vector<int>> &logs, int n) {
        // Replay events chronologically; connectivity models acquaintance.
        vector<vector<int>> sorted(logs);
        sort(sorted.begin(), sorted.end(), [](const vector<int> &a, const vector<int> &b) { return a[0] < b[0]; });
        vector<int> parent(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        // Path-halving find keeps the trees shallow across replays.
        auto find = [&](int a) {
            while (parent[a] != a) {
                parent[a] = parent[parent[a]];
                a = parent[a];
            }
            return a;
        };
        // The component counter tracks the group count so no global scan is
        // ever needed.
        int components = n;
        for (const auto &log : sorted) {
            int rx = find(log[1]);
            int ry = find(log[2]);
            // Redundant (already-friends) events merge nothing.
            if (rx != ry) {
                parent[rx] = ry;
                components--;
                // This merge closed the last divide: everyone is acquainted.
                if (components == 1) {
                    return log[0];
                }
            }
        }
        return -1;
    }
};
