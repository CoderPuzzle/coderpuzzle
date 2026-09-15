class Solution {
  public:
    int secondsToRemoveOccurrences(string s) {
        // A 1 crosses the run of zeros before it in exactly `zeros`
        // seconds, but cannot start until the previous 1 finished, so
        // each one raises the clock to max(ans + 1, zeros).
        int ans = 0;
        int zeros = 0;
        for (char c : s) {
            if (c == '0') {
                ++zeros;
            } else if (zeros > 0) {
                ans = max(ans + 1, zeros);
            }
        }
        return ans;
    }
};
