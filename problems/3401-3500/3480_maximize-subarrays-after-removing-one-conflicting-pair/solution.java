import java.util.ArrayList;
import java.util.List;

class Solution {

    public long maxSubarrays(int n, int[][] conflictingPairs) {
        // bucket each pair at its smaller element; g[a] collects the larger endpoints
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i <= n; i++) g.add(new ArrayList<>());
        for (int[] pair : conflictingPairs) {
            int a = pair[0],
                b = pair[1];
            if (a > b) {
                int t = a;
                a = b;
                b = t;
            }
            g.get(a).add(b);
        }
        long[] cnt = new long[n + 2];
        long ans = 0,
            add = 0;
        int b1 = n + 1,
            b2 = n + 1;
        // sweep left endpoints right to left; b1, b2 are the smallest and
        // second-smallest right endpoint among pairs whose smaller side is >= a
        for (int a = n; a >= 1; a--) {
            for (int b : g.get(a)) {
                if (b < b1) {
                    b2 = b1;
                    b1 = b;
                } else if (b < b2) {
                    b2 = b;
                }
            }
            // a subarray starting at a stays valid up to just before b1
            ans += (long) b1 - a;
            // removing the pair that uniquely supplies b1 relaxes its bound to
            // b2; bank b2 - b1 keyed by b1 (duplicate b's land in b2, gain 0)
            cnt[b1] += (long) (b2 - b1);
            if (cnt[b1] > add) {
                add = cnt[b1];
            }
        }
        ans += add;
        return ans;
    }
}
