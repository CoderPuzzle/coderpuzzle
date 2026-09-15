class Solution {

    public int longestSubsequence(int[] nums) {
        // Values fit below 2^30 (nums[i] <= 10^9) and the answer is at most
        // nums.length <= 10^5, so int arithmetic carries everything here.
        // A subsequence ANDs to something non-zero exactly when all of its
        // elements share at least one set bit, so for each bit keep the
        // elements that have it (order preserved) and take the longest
        // strictly increasing subsequence among them; the best bit wins.
        int top = 0;
        for (int x : nums) {
            top = Math.max(top, x);
        }
        int best = 0;
        for (int b = 0; top >> b > 0; b++) {
            int[] tails = new int[nums.length];
            int size = 0;
            for (int x : nums) {
                if (((x >> b) & 1) == 0) {
                    continue;
                }
                // Strictly increasing: replace the first tail >= x.
                int lo = 0;
                int hi = size;
                while (lo < hi) {
                    int mid = (lo + hi) >>> 1;
                    if (tails[mid] < x) {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                if (lo == size) {
                    tails[size++] = x;
                } else {
                    tails[lo] = x;
                }
            }
            best = Math.max(best, size);
        }
        return best;
    }
}
