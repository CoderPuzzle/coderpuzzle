class Solution {

    public long countSubarrays(int[] nums, long k) {
        // Bounds: (max-min) <= 10^9-1 and length <= 10^5, so every cost is
        // < 10^14; the answer is at most n(n+1)/2 ~ 5*10^9 — both live
        // comfortably in a long.
        int n = nums.length;
        int[] maxQ = new int[n]; // indices of max candidates, values decreasing
        int[] minQ = new int[n]; // indices of min candidates, values increasing
        int maxHead = 0,
            maxTail = 0,
            minHead = 0,
            minTail = 0;
        long ans = 0;
        int left = 0;
        for (int right = 0; right < n; right++) {
            int x = nums[right];
            while (maxHead < maxTail && nums[maxQ[maxTail - 1]] <= x) {
                maxTail--;
            }
            maxQ[maxTail++] = right;
            while (minHead < minTail && nums[minQ[minTail - 1]] >= x) {
                minTail--;
            }
            minQ[minTail++] = right;
            // Growing the window only raises max, lowers min and lengthens
            // the window, so cost is non-decreasing in window size: shrink
            // from the left while invalid, then every subarray ending at
            // right with left endpoint >= left is valid — right-left+1 of
            // them. A single element costs 0 <= k, so the loop stops.
            while ((long) (nums[maxQ[maxHead]] - nums[minQ[minHead]]) * (right - left + 1) > k) {
                if (maxQ[maxHead] == left) {
                    maxHead++;
                }
                if (minQ[minHead] == left) {
                    minHead++;
                }
                left++;
            }
            ans += right - left + 1;
        }
        return ans;
    }
}
