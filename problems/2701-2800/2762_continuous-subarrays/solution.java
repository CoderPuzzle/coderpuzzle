class Solution {

    public long continuousSubarrays(int[] nums) {
        int n = nums.length;
        int[] minDq = new int[n]; // indices, values increasing (front = min)
        int[] maxDq = new int[n]; // indices, values decreasing (front = max)
        int minHead = 0,
            minTail = 0,
            maxHead = 0,
            maxTail = 0; // half-open ranges [head, tail)
        long count = 0;
        int left = 0;
        for (int right = 0; right < n; right++) {
            int value = nums[right];
            while (minTail > minHead && nums[minDq[minTail - 1]] >= value) minTail--;
            minDq[minTail++] = right;
            while (maxTail > maxHead && nums[maxDq[maxTail - 1]] <= value) maxTail--;
            maxDq[maxTail++] = right;
            // equality is allowed, so only a spread above 2 forces the shrink
            while (nums[maxDq[maxHead]] - nums[minDq[minHead]] > 2) {
                if (maxDq[maxHead] == left) maxHead++;
                if (minDq[minHead] == left) minHead++;
                left++;
            }
            // every start in [left, right] keeps the spread within the band
            count += right - left + 1L;
        }
        return count;
    }
}
