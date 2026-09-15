class Solution {

    // Monotone predicate: sum(r / x) >= k. Binary search the largest
    // feasible x; 0 when even x=1 fails.
    public long maxLength(int[] ribbons, int k) {
        long lo = 1,
            hi = 0;
        for (int r : ribbons) {
            hi = Math.max(hi, r);
        }
        long ans = 0;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long pieces = 0;
            for (int r : ribbons) {
                pieces += r / mid;
            }
            if (pieces >= (long) k) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
}
