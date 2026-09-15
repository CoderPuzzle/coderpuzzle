class Solution {

    public int maximumRemovals(String s, String p, int[] removable) {
        // Feasibility is monotone (fewer deletions only restore characters), so the
        // workable k form an interval starting at 0 — binary search its right end.
        int lo = 0,
            hi = removable.length;
        while (lo < hi) {
            // Upper-mid form keeps the search converging toward the largest feasible k.
            int mid = (lo + hi + 1) / 2;
            if (stillSubsequence(s, p, removable, mid)) lo = mid;
            else hi = mid - 1;
        }
        return lo;
    }

    // Classic greedy subsequence scan: skipping removed positions, match each
    // character of p at the earliest opportunity (optimal for containment).
    private boolean stillSubsequence(String s, String p, int[] removable, int k) {
        boolean[] removed = new boolean[s.length()];
        for (int i = 0; i < k; i++) removed[removable[i]] = true;
        int pi = 0;
        for (int i = 0; i < s.length() && pi < p.length(); i++) {
            if (!removed[i] && s.charAt(i) == p.charAt(pi)) pi++;
        }
        return pi == p.length();
    }
}
