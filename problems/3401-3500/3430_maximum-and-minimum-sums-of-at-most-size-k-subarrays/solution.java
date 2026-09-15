class Solution {

    // Number of (a, b) with 0<=a<=A, 0<=b<=B, a+b<=K.
    private long countPairs(long A, long B, long K) {
        if (K < 0 || A < 0 || B < 0) return 0;
        A = Math.min(A, K);
        B = Math.min(B, K);
        if (A + B <= K) return (A + 1) * (B + 1);
        long t = K - B;
        long total = 0;
        if (t >= 0) {
            total += (Math.min(A, t) + 1) * (B + 1);
        }
        long lo = Math.max(0, t + 1);
        if (lo <= A) {
            long m = A - lo + 1;
            total += m * (K + 1) - ((lo + A) * m) / 2;
        }
        return total;
    }

    public long minMaxSubarraySum(int[] nums, int k) {
        int n = nums.length;
        long K = k - 1;

        long[] Lmax = new long[n],
            Rmax = new long[n];
        int[] stack = new int[n];
        int sp = 0;
        for (int i = 0; i < n; i++) {
            while (sp > 0 && nums[stack[sp - 1]] <= nums[i]) sp--;
            Lmax[i] = sp > 0 ? i - stack[sp - 1] - 1 : i;
            stack[sp++] = i;
        }
        sp = 0;
        for (int i = n - 1; i >= 0; i--) {
            while (sp > 0 && nums[stack[sp - 1]] < nums[i]) sp--;
            Rmax[i] = sp > 0 ? stack[sp - 1] - i - 1 : n - 1 - i;
            stack[sp++] = i;
        }

        long[] Lmin = new long[n],
            Rmin = new long[n];
        sp = 0;
        for (int i = 0; i < n; i++) {
            while (sp > 0 && nums[stack[sp - 1]] >= nums[i]) sp--;
            Lmin[i] = sp > 0 ? i - stack[sp - 1] - 1 : i;
            stack[sp++] = i;
        }
        sp = 0;
        for (int i = n - 1; i >= 0; i--) {
            while (sp > 0 && nums[stack[sp - 1]] > nums[i]) sp--;
            Rmin[i] = sp > 0 ? stack[sp - 1] - i - 1 : n - 1 - i;
            stack[sp++] = i;
        }

        long answer = 0;
        for (int i = 0; i < n; i++) {
            long cnt = countPairs(Lmax[i], Rmax[i], K) + countPairs(Lmin[i], Rmin[i], K);
            answer += (long) nums[i] * cnt;
        }
        return answer;
    }
}
