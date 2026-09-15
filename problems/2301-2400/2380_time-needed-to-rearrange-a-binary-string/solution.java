class Solution {

    public int secondsToRemoveOccurrences(String s) {
        // A 1 crosses the run of zeros before it in exactly `zeros`
        // seconds, but cannot start until the previous 1 finished, so
        // each one raises the clock to max(ans + 1, zeros).
        int ans = 0;
        int zeros = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) == '0') {
                ++zeros;
            } else if (zeros > 0) {
                ans = Math.max(ans + 1, zeros);
            }
        }
        return ans;
    }
}
