class Solution {

    public int maximumGap(int[] nums) {
        if (nums.length < 2) {
            // No pair of successive elements exists.
            return 0;
        }
        int lo = nums[0];
        int hi = nums[0];
        for (int value : nums) {
            lo = Math.min(lo, value);
            hi = Math.max(hi, value);
        }
        if (lo == hi) {
            // Equal extremes mean every value is identical: all gaps are 0.
            return 0;
        }
        int count = nums.length - 1;
        // Bucket width ceil(span/count): the average sorted gap is
        // span/count, so the maximum gap — an integer — is at least this
        // wide, and no gap inside a single bucket (spread <= width - 1)
        // can be the answer.
        int width = (hi - lo + count - 1) / count;
        int[] bucketMin = new int[count + 1];
        int[] bucketMax = new int[count + 1];
        boolean[] used = new boolean[count + 1];
        for (int value : nums) {
            // Pure division into [lo, hi] — lo lands in bucket 0, hi in
            // bucket count at most, and no multiplication can overflow.
            int index = (value - lo) / width;
            if (!used[index] || value < bucketMin[index]) {
                bucketMin[index] = value;
            }
            if (!used[index] || value > bucketMax[index]) {
                bucketMax[index] = value;
            }
            used[index] = true;
        }
        int best = 0;
        // Bucket 0 holds lo, so it is never empty.
        int previousMax = bucketMax[0];
        for (int index = 1; index <= count; ++index) {
            if (!used[index]) {
                // Empty bucket: the measured jump only grows wider, and
                // the neighbours are successive in sorted order.
                continue;
            }
            best = Math.max(best, bucketMin[index] - previousMax);
            previousMax = bucketMax[index];
        }
        return best;
    }
}
