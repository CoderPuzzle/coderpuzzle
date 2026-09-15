class Solution {

    public String minWindow(String s, String t) {
        if (t.isEmpty() || t.length() > s.length()) return "";
        int[] quota = new int[128];
        int kinds = 0;
        for (char ch : t.toCharArray()) {
            if (quota[ch] == 0) kinds++;
            quota[ch]++;
        }
        // Coverage is monotone in the length: a covering window of length
        // L sits inside a covering window of length L + 1, so "some window
        // of length L covers t" is false below the answer and true from it
        // upward. Binary search for the smallest surviving length.
        int lo = t.length(),
            hi = s.length();
        int bestStart = -1,
            bestLen = -1;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            int start = covers(s, quota, kinds, mid);
            if (start >= 0) {
                bestStart = start;
                bestLen = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        // Within the minimal length the scan reports the leftmost cover,
        // the same window the shrinking sweep settles on.
        return bestStart < 0 ? "" : s.substring(bestStart, bestStart + bestLen);
    }

    // Slide one window of exactly `length` across s. `below` counts
    // demanded letters still short of quota, so below == 0 means this
    // window covers t; letters absent from t never touch it.
    private int covers(String s, int[] quota, int kinds, int length) {
        int[] have = new int[128];
        int below = kinds;
        for (int i = 0; i < length; i++) {
            char ch = s.charAt(i);
            if (quota[ch] > 0 && ++have[ch] == quota[ch]) below--;
        }
        if (below == 0) return 0;
        for (int start = 1; start + length <= s.length(); start++) {
            char in = s.charAt(start + length - 1);
            if (quota[in] > 0 && ++have[in] == quota[in]) below--;
            char out = s.charAt(start - 1);
            // Dropping from exactly-at-quota to one short reopens the
            // debt; deeper surpluses change nothing.
            if (quota[out] > 0 && have[out]-- == quota[out]) below++;
            if (below == 0) return start;
        }
        return -1;
    }
}
