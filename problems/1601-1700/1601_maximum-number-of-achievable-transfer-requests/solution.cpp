class Solution {
  public:
    int maximumRequests(int n, vector<vector<int>> &requests) {
        int m = requests.size();
        int best = 0;
        for (int mask = 0; mask < (1 << m); mask++) {
            int popcount = __builtin_popcount(mask);
            if (popcount <= best) {
                continue;
            }
            vector<int> degree(n, 0);
            for (int i = 0; i < m; i++) {
                if (mask & (1 << i)) {
                    degree[requests[i][0]]--;
                    degree[requests[i][1]]++;
                }
            }
            bool balanced = true;
            for (int d : degree) {
                if (d != 0) {
                    balanced = false;
                    break;
                }
            }
            if (balanced) {
                best = popcount;
            }
        }
        return best;
    }
};
