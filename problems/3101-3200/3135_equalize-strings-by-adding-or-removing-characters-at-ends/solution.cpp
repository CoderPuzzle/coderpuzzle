class Solution {
  public:
    int minOperations(string initial, string target) {
        // Characters that survive form a contiguous window of initial and a
        // contiguous window of target, i.e. a common substring; every other
        // character costs exactly one operation, so the answer is
        // m + n - 2 * (longest common substring).
        int best = 0;
        int n = static_cast<int>(target.size());
        vector<int> prev(n + 1, 0);
        for (char a : initial) {
            vector<int> cur(n + 1, 0);
            for (int j = 0; j < n; j++) {
                if (a == target[j]) {
                    cur[j + 1] = prev[j] + 1;
                    best = max(best, cur[j + 1]);
                }
            }
            prev = move(cur);
        }
        return static_cast<int>(initial.size() + target.size()) - 2 * best;
    }
};
