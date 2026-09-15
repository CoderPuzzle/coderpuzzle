class Solution {

    public long countSubarrays(int[] nums, int minK, int maxK) {
        long count = 0;
        // most recent positions of an out-of-range element, minK, and maxK
        long lastBad = -1,
            lastMin = -1,
            lastMax = -1;
        for (int i = 0; i < nums.length; i++) {
            int x = nums[i];
            // a valid subarray ending later must start after a bad element
            if (x < minK || x > maxK) lastBad = i;
            // tracking the last occurrence is enough: it covers earlier ones
            if (x == minK) lastMin = i;
            if (x == maxK) lastMax = i;
            // starts for this right end: after lastBad, at or before
            // min(lastMin, lastMax); the 0 clamp skips ends with no valid start
            count += Math.max(0L, Math.min(lastMin, lastMax) - lastBad);
        }
        return count;
    }
}
