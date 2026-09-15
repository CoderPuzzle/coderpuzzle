class Solution {

    public int maximumCount(int[] nums) {
        // In a sorted array the negatives are exactly the prefix ending
        // before the first value >= 0 and the positives are exactly the
        // suffix starting at the first value >= 1. Two lowerBound searches
        // fix both boundaries in O(log n); zeros belong to neither side.
        int neg = lowerBound(nums, 0);
        int pos = nums.length - lowerBound(nums, 1);
        return Math.max(neg, pos);
    }

    private int lowerBound(int[] nums, int target) {
        int lo = 0;
        int hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
