class Solution {

    // feasibility is monotone in c: if every child can get c, any smaller
    // amount works too, so binary search the largest feasible pile size
    public int maximumCandies(int[] candies, long k) {
        int lo = 0,
            hi = 0;
        for (int p : candies) {
            hi = Math.max(hi, p);
        }
        while (lo < hi) {
            // upper mid: feasible moves lo up to mid; the +1 avoids stalling
            int mid = lo + (hi - lo + 1) / 2;
            if (can(candies, mid, k)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    // c is feasible iff the piles split into at least k portions of size c
    private boolean can(int[] candies, int c, long k) {
        if (c == 0) {
            return true;
        }
        long cnt = 0;
        for (int p : candies) {
            // a pile of size p contributes exactly p / c child-sized portions
            cnt += p / c;
            if (cnt >= k) {
                return true;
            }
        }
        return cnt >= k;
    }
}
