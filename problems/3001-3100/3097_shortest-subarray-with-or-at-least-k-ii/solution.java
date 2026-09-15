class Solution {

    public int minimumSubarrayLength(int[] nums, int k) {
        // Validity of a window is downward-closed in its left end (shrinking
        // can only drop bits) and extending r never invalidates a previously
        // valid l, so the shortest valid left end never regresses: two
        // pointers amortize. OR cannot be undone directly, so per-bit counts
        // rebuild the window OR one counter flip at a time on add/remove.
        int[] counts = new int[30];
        int best = -1;
        int left = 0;
        for (int right = 0; right < nums.length; ++right) {
            for (int b = 0; b < 30; ++b) {
                counts[b] += (nums[right] >> b) & 1;
            }
            // Shrink while the window stays special; each recorded length is
            // a candidate, and the one recorded just before the window
            // breaks is the shortest ending here.
            while (left <= right && windowOr(counts) >= k) {
                int length = right - left + 1;
                if (best == -1 || length < best) {
                    best = length;
                }
                int leaving = nums[left];
                for (int b = 0; b < 30; ++b) {
                    counts[b] -= (leaving >> b) & 1;
                }
                ++left;
            }
        }
        return best;
    }

    private int windowOr(int[] counts) {
        int v = 0;
        for (int b = 0; b < 30; ++b) {
            if (counts[b] > 0) {
                v |= 1 << b;
            }
        }
        return v;
    }
}
