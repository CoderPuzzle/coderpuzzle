class Solution {

    public int[] findMissingElements(int[] nums) {
        // Mark presence per value, then sweep the original range [min, max]
        // in increasing order: every unmarked value is missing, and sweeping
        // in order yields the sorted result directly.
        int lo = Integer.MAX_VALUE,
            hi = Integer.MIN_VALUE;
        for (int value : nums) {
            lo = Math.min(lo, value);
            hi = Math.max(hi, value);
        }
        boolean[] present = new boolean[hi + 1];
        for (int value : nums) {
            present[value] = true;
        }
        // Values are unique and all inside [lo, hi], so exactly this many
        // integers of the range are missing.
        int[] missing = new int[hi - lo + 1 - nums.length];
        int index = 0;
        for (int value = lo; value <= hi; ++value) {
            if (!present[value]) {
                missing[index++] = value;
            }
        }
        return missing;
    }
}
