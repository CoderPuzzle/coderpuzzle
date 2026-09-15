import java.util.ArrayList;
import java.util.List;

class Solution {

    // For a fixed left end the window gcd only ever decreases as the
    // window grows, and every drop at least halves it, so each left end
    // owns only O(log(max(nums))) distinct gcd values. Keeping one
    // (gcd, furthest right end) entry per value turns the sweep into a
    // merge of two short lists. Prefix sums reach 10^5 * 10^6 = 10^11 and
    // the products reach past the 32-bit range, so the sums, gcds, and
    // products all widen to long.
    private static long gcd(long a, long b) {
        while (b != 0) {
            long rest = a % b;
            a = b;
            b = rest;
        }
        return a;
    }

    public long maxGcdSum(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
        long best = 0;
        List<Long> gs = new ArrayList<>();
        List<Long> rs = new ArrayList<>();
        for (int lo = n - 1; lo >= 0; lo--) {
            List<Long> ng = new ArrayList<>();
            List<Long> nr = new ArrayList<>();
            ng.add((long) nums[lo]);
            nr.add((long) lo);
            for (int t = 0; t < gs.size(); t++) {
                long merged = gcd(gs.get(t), nums[lo]);
                if (merged == ng.get(ng.size() - 1)) {
                    nr.set(nr.size() - 1, rs.get(t));
                } else {
                    ng.add(merged);
                    nr.add(rs.get(t));
                }
            }
            gs = ng;
            rs = nr;
            for (int t = 0; t < gs.size(); t++) {
                if (rs.get(t) - lo + 1 >= k) {
                    // Positive elements: the longest window with this gcd
                    // has the largest sum.
                    long candidate = gs.get(t) * (prefix[rs.get(t).intValue() + 1] - prefix[lo]);
                    if (candidate > best) best = candidate;
                }
            }
        }
        return best;
    }
}
