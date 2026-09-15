class Solution {

    public long maxGCDScore(int[] nums, int k) {
        // Only the 2-adic tier t = v2(value) and the odd part of each
        // element matter: doubling bumps one element's tier by 1 and never
        // touches odd parts, so a window's gcd is 2^M * g where
        // g = gcd of odd parts and M is the promoted minimum tier.
        int n = nums.length;
        long[] odd = new long[n];
        int[] tier = new int[n];
        for (int i = 0; i < n; ++i) {
            int low = nums[i] & -nums[i];
            odd[i] = nums[i] / low;
            tier[i] = Integer.numberOfTrailingZeros(low);
        }
        long[] p2 = new long[34];
        p2[0] = 1;
        for (int i = 1; i < 34; ++i) p2[i] = p2[i - 1] * 2;
        long best = 0;
        for (int l = 0; l < n; ++l) {
            int g = 0;
            int[] cnt = new int[32];
            int m = 32;
            for (int r = l; r < n; ++r) {
                g = gcd(g, (int) odd[r]);
                int t = tier[r];
                ++cnt[t];
                if (t < m) m = t;
                // Each element doubles at most once, so every element sits
                // at tier t or t+1: raising the minimum past m would need
                // the tier-m elements promoted twice — impossible. M is
                // m + 1 only when the budget covers every tier-m element.
                int M = cnt[m] <= k ? m + 1 : m;
                long score = (long) (r - l + 1) * p2[M] * g;
                if (score > best) best = score;
                // Windows further right from l: len <= n - l, g only
                // drops, M <= m + 1; stop once that bound can't beat best.
                if (p2[m + 1] * g * (n - l) <= best) break;
            }
        }
        return best;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
