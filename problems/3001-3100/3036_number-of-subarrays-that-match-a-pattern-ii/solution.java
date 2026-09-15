class Solution {

    public int countMatchingSubarrays(int[] nums, int[] pattern) {
        // Reduce nums to its sign sequence s of length n - 1: s[t] is 1, 0,
        // or -1 according to nums[t + 1] vs nums[t]. Condition k of the
        // match definition is exactly s[i + k] == pattern[k], so the window
        // starting at i matches iff pattern occurs in s at offset i.
        // Counting windows becomes substring search, linear with KMP.
        int n = nums.length;
        int[] signs = new int[n - 1];
        for (int t = 0; t + 1 < n; t++) {
            if (nums[t + 1] > nums[t]) {
                signs[t] = 1;
            } else if (nums[t + 1] < nums[t]) {
                signs[t] = -1;
            }
        }
        int m = pattern.length;
        int[] failure = new int[m];
        int matched = 0;
        for (int index = 1; index < m; index++) {
            while (matched > 0 && pattern[index] != pattern[matched]) {
                matched = failure[matched - 1];
            }
            if (pattern[index] == pattern[matched]) {
                matched++;
            }
            failure[index] = matched;
        }
        int count = 0;
        matched = 0;
        for (int sign : signs) {
            while (matched > 0 && sign != pattern[matched]) {
                matched = failure[matched - 1];
            }
            if (sign == pattern[matched]) {
                matched++;
            }
            if (matched == m) {
                // Full occurrence; fall back so overlaps keep counting.
                count++;
                matched = failure[matched - 1];
            }
        }
        return count;
    }
}
