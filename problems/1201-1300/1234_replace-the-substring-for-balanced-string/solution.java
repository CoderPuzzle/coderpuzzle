class Solution {

    public int balancedString(String s) {
        int n = s.length();
        int target = n / 4;
        // Surplus letters are the only ones the window must cover.
        int[] total = new int[128];
        for (int i = 0; i < n; ++i) total[s.charAt(i)]++;
        int[] need = new int[128];
        int kinds = 0;
        for (int c = 'A'; c <= 'Z'; ++c) {
            if (total[c] > target) {
                need[c] = total[c] - target;
                kinds++;
            }
        }
        if (kinds == 0) return 0;
        int[] window = new int[128];
        int served = 0;
        int best = n;
        int left = 0;
        for (int right = 0; right < n; ++right) {
            int ch = s.charAt(right);
            if (need[ch] > 0) {
                window[ch]++;
                if (window[ch] == need[ch]) served++;
            }
            while (served == kinds) {
                best = Math.min(best, right - left + 1);
                int leftCh = s.charAt(left);
                if (need[leftCh] > 0) {
                    if (window[leftCh] == need[leftCh]) served--;
                    window[leftCh]--;
                }
                left++;
            }
        }
        return best;
    }
}
