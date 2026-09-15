import java.util.HashSet;
import java.util.Set;

class Solution {

    public int longestCommonSubpath(int n, int[][] paths) {
        // Two independent moduli combined into one key make an accidental
        // collision astronomically unlikely.
        final long MOD1 = 1_000_000_007L;
        final long MOD2 = 1_000_000_009L;
        final long BASE = 1000003L;

        int m = paths.length;
        int lo = 0,
            hi = Integer.MAX_VALUE;
        for (int[] p : paths) hi = Math.min(hi, p.length);

        // Existence is monotone in L (any prefix of a common subpath is common),
        // so upper-mid binary search converges on the maximum feasible length.
        while (lo < hi) {
            int mid = (lo + hi + 1) >>> 1;
            if (exists(mid, paths, MOD1, MOD2, BASE)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private static boolean exists(int length, int[][] paths, long MOD1, long MOD2, long BASE) {
        Set<Long> common = null;
        for (int[] path : paths) {
            if (path.length < length) return false;
            long h1 = 0,
                h2 = 0;
            long power1 = 1,
                power2 = 1;
            // +1 per city id so a run of city 0 never hashes to the all-zero value.
            for (int i = 0; i < length; i++) {
                h1 = (h1 * BASE + path[i] + 1) % MOD1;
                h2 = (h2 * BASE + path[i] + 1) % MOD2;
                power1 = (power1 * BASE) % MOD1;
                power2 = (power2 * BASE) % MOD2;
            }
            Set<Long> hashes = new HashSet<>();
            hashes.add(h1 * MOD2 + h2);
            // Roll the window: multiply by base, drop the outgoing digit
            // weighted by BASE^L, add the incoming digit (constant per step).
            for (int i = length; i < path.length; i++) {
                long out1 = ((path[i - length] + 1) * power1) % MOD1;
                long out2 = ((path[i - length] + 1) * power2) % MOD2;
                h1 = (((h1 * BASE - out1) % MOD1) + MOD1) % MOD1;
                h2 = (((h2 * BASE - out2) % MOD2) + MOD2) % MOD2;
                h1 = (h1 + path[i] + 1) % MOD1;
                h2 = (h2 + path[i] + 1) % MOD2;
                hashes.add(h1 * MOD2 + h2);
            }
            // The first path seeds the set; each later path intersects into
            // it, bailing out the moment the intersection empties.
            if (common == null) {
                common = hashes;
            } else {
                common.retainAll(hashes);
                if (common.isEmpty()) return false;
            }
        }
        return common != null && !common.isEmpty();
    }
}
