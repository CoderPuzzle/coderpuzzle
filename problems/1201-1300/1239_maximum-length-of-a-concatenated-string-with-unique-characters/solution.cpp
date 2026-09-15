class Solution {
  public:
    int maxLength(vector<string> &arr) {
        int n = arr.size();
        // A concatenation is fully described by which of the 26 letters it
        // holds, so each string becomes a bitmask; a self-repeating string
        // (mask -1) can never join a valid combination and is skipped later.
        vector<int> masks(n);
        for (int i = 0; i < n; i++) {
            int mask = 0;
            bool bad = false;
            for (char ch : arr[i]) {
                int bit = 1 << (ch - 'a');
                if (mask & bit) {
                    bad = true;
                    break;
                }
                mask |= bit;
            }
            masks[i] = bad ? -1 : mask;
        }
        int best = 0;
        function<void(int, int)> dfs = [&](int index, int used) {
            // The combination length is just the popcount of its mask.
            best = max(best, __builtin_popcount((unsigned)used));
            // The start index only moves forward: each subsequence is tried
            // once in index order (length is order-independent). Compatible
            // strings are exactly those whose mask ANDs with `used` to zero.
            for (int j = index; j < n; j++) {
                if (masks[j] != -1 && (used & masks[j]) == 0) {
                    dfs(j + 1, used | masks[j]);
                }
            }
        };
        dfs(0, 0);
        return best;
    }
};
