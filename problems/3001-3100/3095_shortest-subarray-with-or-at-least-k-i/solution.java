class Solution {

    public int minimumSubarrayLength(int[] nums, int k) {
        // Fix the right endpoint and extend left with a running OR of
        // nums[l..r]; the first l reaching k is the shortest special
        // subarray ending at r. With values <= 50 the OR stays below 64,
        // so ints never come close to overflowing.
        int best = -1;
        for (int r = 0; r < nums.length; r++) {
            int current = 0;
            for (int l = r; l >= 0; l--) {
                current |= nums[l];
                if (current >= k) {
                    int length = r - l + 1;
                    if (best == -1 || length < best) {
                        best = length;
                    }
                    break;
                }
            }
        }
        return best;
    }
}
