class Solution {

    public int[] findKDistantIndices(int[] nums, int key, int k) {
        int[] out = new int[nums.length];
        int size = 0;
        int nextFree = 0;
        // each key occurrence contributes the window [j-k, j+k]; windows
        // are naturally ordered, so clip against what's already emitted
        // instead of deduplicating through a set
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != key) {
                continue;
            }
            int lo = Math.max(nextFree, j - k);
            int hi = Math.min(nums.length - 1, j + k);
            while (lo <= hi) {
                out[size++] = lo++;
            }
            nextFree = hi + 1;
        }
        return java.util.Arrays.copyOf(out, size);
    }
}
