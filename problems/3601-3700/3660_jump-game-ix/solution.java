class Solution {

    public int[] maxValue(int[] nums) {
        int n = nums.length;
        // suf[i]: smallest value in nums[i..n-1]; Integer.MAX_VALUE past the
        // end lets the last index always close its segment.
        int[] suf = new int[n + 1];
        suf[n] = Integer.MAX_VALUE;
        for (int i = n - 1; i >= 0; i--) {
            suf[i] = Math.min(suf[i + 1], nums[i]);
        }
        // Grow the current segment while its prefix maximum strictly exceeds
        // the suffix minimum just past it: any such boundary is crossed by
        // an inverted pair, so the component cannot end there.
        int[] ans = new int[n];
        int segMax = 0,
            run = 0,
            written = 0;
        for (int i = 0; i < n; i++) {
            segMax = Math.max(segMax, nums[i]);
            run++;
            if (i == n - 1 || segMax <= suf[i + 1]) {
                // The segment is closed: every index inside it reaches the
                // segment maximum and nothing beyond it.
                for (int j = 0; j < run; j++) {
                    ans[written++] = segMax;
                }
                segMax = 0;
                run = 0;
            }
        }
        return ans;
    }
}
