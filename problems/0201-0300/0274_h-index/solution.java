class Solution {

    public int hIndex(int[] citations) {
        int n = citations.length;
        // h can never exceed the paper count, so citations above n are as
        // good as n: tally into n+1 buckets with oversized values clamped.
        int[] count = new int[n + 1];
        for (int c : citations) {
            count[Math.min(c, n)]++;
        }
        // Walk h from the top; after adding bucket h, total is the number of
        // papers with at least h citations (larger counts were clamped into
        // higher-or-equal buckets and are already included).
        int total = 0;
        for (int h = n; h >= 0; h--) {
            total += count[h];
            // First h with "at least h papers cited >= h" is maximal: every
            // larger h was tested first and failed this same test.
            if (total >= h) {
                return h;
            }
        }
        // Unreachable: at h = 0 the accumulated total is n >= 0.
        return 0;
    }
}
