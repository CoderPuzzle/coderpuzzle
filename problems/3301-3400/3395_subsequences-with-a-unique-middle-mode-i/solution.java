import java.util.HashMap;
import java.util.Map;

class Solution {

    // Fix the middle index m and count (left pair, right pair) combos where
    // x = nums[m] is the unique mode. With a+b >= 2 side copies of x its
    // frequency 1+a+b is untouchable; with exactly one side copy the 3
    // non-x picks must be pairwise distinct. Per-middle terms stay below
    // ~4 * 10^12, so they are accumulated in a long and reduced modulo
    // 10^9 + 7 each middle.
    public int subsequencesWithMiddleMode(int[] nums) {
        final long MOD = 1000000007L;
        int n = nums.length;
        Map<Integer, Integer> ids = new HashMap<>();
        int[] comp = new int[n];
        for (int i = 0; i < n; ++i) {
            Integer id = ids.get(nums[i]);
            if (id == null) {
                id = ids.size();
                ids.put(nums[i], id);
            }
            comp[i] = id;
        }
        int d = ids.size();
        int[] cntL = new int[d];
        int[] cntR = new int[d];
        long SL = 0;
        long SR = 0;
        for (int i = 1; i < n; ++i) {
            SR += cntR[comp[i]];
            cntR[comp[i]] += 1;
        }
        long ans = 0;
        for (int m = 0; m < n; ++m) {
            int x = comp[m];
            if (m > 0) {
                // advance: nums[m-1] joins the left, nums[m] leaves the right
                int y = comp[m - 1];
                SL += cntL[y];
                cntL[y] += 1;
                SR -= cntR[x] - 1;
                cntR[x] -= 1;
            }
            long l = cntL[x];
            long r = cntR[x];
            long ml = m - l;
            long mr = n - 1 - m - r;
            long cl = (l * (l - 1)) / 2;
            long cr = (r * (r - 1)) / 2;
            // pair sums over non-x values only: x contributes cl / cr itself
            long SxL = SL - cl;
            long SxR = SR - cr;
            // exactly one side copy of x: the right pair avoids the left
            // pick's value (T_R), or mirrored (T_L)
            long TR = 0;
            for (int u = 0; u < d; ++u) {
                int lu = cntL[u];
                if (lu > 0 && u != x) {
                    int cR = cntR[u];
                    TR += lu * (c2(mr - cR) - SxR + c2(cR));
                }
            }
            long TL = 0;
            for (int u = 0; u < d; ++u) {
                int ru = cntR[u];
                if (ru > 0 && u != x) {
                    int cL = cntL[u];
                    TL += ru * (c2(ml - cL) - SxL + c2(cL));
                }
            }
            long total =
                cl * c2(mr) + cl * r * mr + cl * cr + l * ml * r * mr + l * ml * cr + c2(ml) * cr + l * TR + r * TL;
            ans = (ans + total) % MOD;
        }
        return (int) ans;
    }

    private static long c2(long t) {
        return (t * (t - 1)) / 2;
    }
}
