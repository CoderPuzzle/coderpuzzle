class Solution {

    public int[] diStringMatch(String s) {
        // Two counters bracket the value range: `lo` is the smallest value
        // not yet placed, `hi` the largest. An 'I' is safest satisfied with
        // lo (everything still unused is larger), a 'D' with hi — the pinned
        // canonical construction.
        int n = s.length();
        int lo = 0,
            hi = n;
        int[] perm = new int[n + 1];
        int k = 0;
        for (int i = 0; i < n; ++i) {
            if (s.charAt(i) == 'I') {
                perm[k++] = lo++;
            } else {
                perm[k++] = hi--;
            }
        }
        // lo and hi have met; the single leftover value fills the last slot.
        perm[k] = lo;
        return perm;
    }
}
