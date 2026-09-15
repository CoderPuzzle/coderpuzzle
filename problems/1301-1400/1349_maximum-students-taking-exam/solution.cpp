class Solution {
  public:
    int maxStudents(vector<vector<string>> &seats) {
        int m = (int)seats.size();
        int n = (int)seats[0].size();

        vector<vector<int>> rowMasks;
        for (const vector<string> &row : seats) {
            vector<int> masks;
            for (int mask = 0; mask < (1 << n); mask++) {
                bool ok = true;
                for (int c = 0; c < n; c++) {
                    if ((mask >> c) & 1) {
                        if (row[c] == "#") {
                            ok = false;
                            break;
                        }
                        if (c > 0 && ((mask >> (c - 1)) & 1)) {
                            ok = false;
                            break;
                        }
                    }
                }
                if (ok)
                    masks.push_back(mask);
            }
            rowMasks.push_back(masks);
        }

        // dp over rows: states maps previous row's mask -> best count so far.
        unordered_map<int, int> states;
        states[0] = 0;
        for (int i = 0; i < m; i++) {
            unordered_map<int, int> newStates;
            for (int mask : rowMasks[i]) {
                int best = -1;
                for (const auto &e : states) {
                    int prev = e.first;
                    // no student directly above-left or above-right
                    if (mask & ((prev << 1) | (prev >> 1)))
                        continue;
                    if (e.second > best)
                        best = e.second;
                }
                if (best >= 0) {
                    int v = best + __builtin_popcount(mask);
                    auto it = newStates.find(mask);
                    if (it == newStates.end() || v > it->second)
                        newStates[mask] = v;
                }
            }
            states = newStates;
        }
        int ans = 0;
        for (const auto &e : states) {
            if (e.second > ans)
                ans = e.second;
        }
        return ans;
    }
};
