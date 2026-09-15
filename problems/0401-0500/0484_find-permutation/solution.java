class Solution {

    public int[] findPermutation(String s) {
        // Ascending 1..n+1 is the lexicographically smallest arrangement of
        // the values, and it already satisfies every 'I' — so disturb it only
        // where a maximal run of 'D's demands a descent, by reversing exactly
        // the block that run covers.
        int n = s.length();
        int[] perm = new int[n + 1];
        for (int i = 0; i <= n; ++i) {
            perm[i] = i + 1;
        }
        int i = 0;
        while (i < n) {
            if (s.charAt(i) == 'D') {
                int start = i;
                while (i < n && s.charAt(i) == 'D') {
                    ++i;
                }
                for (int lo = start, hi = i; lo < hi; ++lo, --hi) {
                    int tmp = perm[lo];
                    perm[lo] = perm[hi];
                    perm[hi] = tmp;
                }
            } else {
                ++i;
            }
        }
        return perm;
    }
}
