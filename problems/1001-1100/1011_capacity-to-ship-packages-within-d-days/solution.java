class Solution {

    public int shipWithinDays(int[] weights, int days) {
        // feasibility is monotone in capacity; lo must at least carry the
        // heaviest package, hi = total weight ships everything in one day
        int lo = 0;
        int hi = 0;
        for (int w : weights) {
            lo = Math.max(lo, w);
            hi += w;
        }
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            // hi always stays feasible, lo moves past infeasible midpoints,
            // so the loop ends on the least feasible capacity
            if (feasible(weights, days, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] weights, int days, int cap) {
        int need = 1;
        int current = 0;
        // order fixed: greedily filling each day as full as possible
        // minimizes the day count, so this pass decides feasibility
        for (int w : weights) {
            if (current + w > cap) {
                need += 1;
                if (need > days) {
                    return false;
                }
                current = w;
            } else {
                current += w;
            }
        }
        return true;
    }
}
