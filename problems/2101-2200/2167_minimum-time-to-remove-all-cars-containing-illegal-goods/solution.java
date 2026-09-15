class Solution {

    public int minimumTime(String s) {
        int n = s.length();
        // cost(l, r) = l + (n - r) + 2 * count1(s[l:r])
        //            = n + sum over kept chars of (1 if '1' else -1).
        // Minimize by taking the minimum subarray sum (empty subarray allowed).
        int minEnd = 0;
        int best = 0;
        for (int k = 0; k < n; k++) {
            int value = s.charAt(k) == '1' ? 1 : -1;
            minEnd = Math.min(value, minEnd + value);
            best = Math.min(best, minEnd);
        }
        return n + best;
    }
}
