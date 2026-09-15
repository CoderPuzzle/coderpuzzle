class Solution {

    public int minimizedMaximum(int n, int[] quantities) {
        // Feasibility is monotone in the cap x, so binary-search the
        // smallest feasible one. hi = max(quantities) is always feasible
        // (one store can take an entire product type).
        int lo = 1;
        int hi = 0;
        for (int q : quantities) {
            hi = Math.max(hi, q);
        }
        // Invariant: lo possibly too small, hi known feasible; the sum check
        // uses <= n since leftover stores may receive nothing.
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (storesNeeded(quantities, mid) <= n) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private long storesNeeded(int[] quantities, int x) {
        // A store holds one product type only, so a type with q items needs
        // ceil(q/x) stores; integer arithmetic avoids floats.
        long total = 0;
        for (int q : quantities) {
            total += (q + x - 1) / x;
        }
        return total;
    }
}
