import java.util.Arrays;

class Solution {

    public int maximumScore(int[] nums, int k) {
        final long MOD = 1000000007L;
        int n = nums.length;
        int maxv = 0;
        for (int x : nums) maxv = Math.max(maxv, x);

        // Smallest-prime-factor sieve: lets each value's distinct prime
        // count be read off by repeated division, no trial division.
        int[] spf = new int[maxv + 1];
        for (int i = 0; i <= maxv; i++) spf[i] = i;
        for (int i = 2; (long) i * i <= maxv; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j <= maxv; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }

        // Prime score = number of distinct prime factors; dividing out
        // each prime fully counts it exactly once.
        int[] scores = new int[n];
        for (int i = 0; i < n; i++) {
            int v = nums[i];
            int cnt = 0;
            int lastp = -1;
            while (v > 1) {
                int p = spf[v];
                if (p != lastp) {
                    cnt++;
                    lastp = p;
                }
                while (v % p == 0) v /= p;
            }
            scores[i] = cnt;
        }

        // left[i]: nearest index left of i with prime score >= score[i].
        int[] left = new int[n];
        int[] stack = new int[n];
        int top = 0;
        for (int i = 0; i < n; i++) {
            while (top > 0 && scores[stack[top - 1]] < scores[i]) top--;
            left[i] = top > 0 ? stack[top - 1] : -1;
            stack[top++] = i;
        }

        // right[i]: nearest index right of i with score strictly greater.
        // The >= / > asymmetry gives tied subarrays to the smallest index,
        // so every subarray is attributed to exactly one element.
        int[] right = new int[n];
        top = 0;
        for (int i = n - 1; i >= 0; i--) {
            while (top > 0 && scores[stack[top - 1]] <= scores[i]) top--;
            right[i] = top > 0 ? stack[top - 1] : n;
            stack[top++] = i;
        }

        // Greedy: take the largest value first; for element i the number
        // of subarrays where it holds the highest prime score is
        // (i - left[i]) * (right[i] - i), an upper bound on its picks.
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> Integer.compare(nums[b], nums[a]));

        long score = 1;
        long rem = k;
        for (int i : idx) {
            // Cap picks at the winning-subarray count and the remaining
            // budget; one fast exponentiation covers any multiplicity.
            long cnt = (long) (i - left[i]) * (right[i] - i);
            long use = Math.min(cnt, rem);
            if (use > 0) {
                score = (score * modpow(nums[i], use, MOD)) % MOD;
                rem -= use;
            }
            if (rem == 0) break;
        }
        return (int) score;
    }

    private long modpow(long base, long e, long mod) {
        long r = 1 % mod;
        long b = base % mod;
        while (e > 0) {
            if ((e & 1) == 1) r = (r * b) % mod;
            b = (b * b) % mod;
            e >>= 1;
        }
        return r;
    }
}
