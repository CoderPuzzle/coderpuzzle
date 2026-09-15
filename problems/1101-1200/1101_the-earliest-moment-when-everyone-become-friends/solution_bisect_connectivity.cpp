class Solution {
  public:
    int earliestAcq(vector<vector<int>> &logs, int n) {
        // Replay order first: the bisection asks prefix questions of the
        // chronologically sorted logs.
        vector<vector<int>> sorted(logs);
        sort(sorted.begin(), sorted.end(), [](const vector<int> &a, const vector<int> &b) { return a[0] < b[0]; });
        // Predicate for the bisection: does the prefix of the k soonest
        // logs already hold all n elements in one group? A fresh
        // union-find per probe.
        auto connected = [&](int k) {
            vector<int> parent(n);
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            // Path-halving find keeps the trees shallow within one probe.
            auto find = [&](int a) {
                while (parent[a] != a) {
                    parent[a] = parent[parent[a]];
                    a = parent[a];
                }
                return a;
            };
            // The component counter tracks the group count so no global scan
            // is ever needed.
            int components = n;
            for (int i = 0; i < k; i++) {
                int rx = find(sorted[i][1]);
                int ry = find(sorted[i][2]);
                // Redundant (already-connected) logs merge nothing.
                if (rx != ry) {
                    parent[rx] = ry;
                    components--;
                }
            }
            return components == 1;
        };
        // Links never disappear, so once connected always connected: the
        // predicate is monotone in k and the smallest true k can be bisected.
        int m = (int)sorted.size();
        if (!connected(m)) {
            return -1;
        }
        int lo = 1, hi = m;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (connected(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The last event of the surviving prefix carries the answer's moment.
        return sorted[lo - 1][0];
    }
};
