class Solution {

    public int sumCounts(int[] nums) {
        // Fenwick pair over the per-start distinct counts d[j] of the windows
        // ending at the current index: range-add and range-sum of exact
        // counts. Range sums reach n(n+1)/2 ~ 5*10^9, past 32 bits, so every
        // accumulator stays in long.
        final long MOD = 1000000007L;
        int n = nums.length;
        long[] b1 = new long[n + 2];
        long[] b2 = new long[n + 2];
        int[] last = new int[100001];
        for (int v = 0; v <= 100000; ++v) {
            last[v] = -1;
        }
        long answer = 0,
            running = 0;
        for (int i = 0; i < n; ++i) {
            int lo = last[nums[i]] + 2;
            // Windows opened in (last, i-1] each gain one distinct value, so
            // their squares grow by 2*d + 1; the fresh window contributes
            // 1^2. T is the exact pre-increment sum over the gaining range.
            long t = lo <= i ? prefix(b1, b2, i) - prefix(b1, b2, lo - 1) : 0;
            running = (running + 2 * t + (i - lo + 2)) % MOD;
            answer = (answer + running) % MOD;
            if (lo <= i) {
                add(b1, b2, n, lo, i, 1);
            }
            add(b1, b2, n, i + 1, i + 1, 1);
            last[nums[i]] = i;
        }
        return (int) answer;
    }

    private void add(long[] b1, long[] b2, int n, int l, int r, long v) {
        for (int x = l; x <= n + 1; x += x & -x) {
            b1[x] += v;
            b2[x] += v * (l - 1);
        }
        for (int x = r + 1; x <= n + 1; x += x & -x) {
            b1[x] -= v;
            b2[x] -= v * r;
        }
    }

    private long prefix(long[] b1, long[] b2, int x) {
        int x0 = x;
        long s1 = 0,
            s2 = 0;
        while (x > 0) {
            s1 += b1[x];
            s2 += b2[x];
            x -= x & -x;
        }
        return s1 * x0 - s2;
    }
}
