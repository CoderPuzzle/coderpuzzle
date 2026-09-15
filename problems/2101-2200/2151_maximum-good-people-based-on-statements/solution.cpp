class Solution {
  public:
    int maximumGood(vector<vector<int>> &statements) {
        int n = statements.size();
        int best = 0;
        // Enumerate every assignment: bit i set means person i is good.
        // The constraint is one-sided — good people must tell the truth,
        // bad people may say anything.
        for (int mask = 0; mask < (1 << n); mask++) {
            bool valid = true;
            int count = 0;
            for (int i = 0; i < n && valid; i++) {
                if (!(mask & (1 << i))) {
                    continue;
                }
                count++;
                for (int j = 0; j < n; j++) {
                    // 2 = no statement; a "j is good" claim requires bit j
                    // set and a "j is bad" claim requires it clear.
                    if (statements[i][j] == 2) {
                        continue;
                    }
                    bool isGood = (mask >> j) & 1;
                    if (isGood != (statements[i][j] == 1)) {
                        valid = false;
                        break;
                    }
                }
            }
            if (valid) {
                best = max(best, count);
            }
        }
        return best;
    }
};
