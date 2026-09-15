class Solution {

    public int[] decompressRLElist(int[] nums) {
        // Size the output up front: it is the sum of all frequencies.
        int total = 0;
        for (int i = 0; i < nums.length; i += 2) {
            total += nums[i];
        }
        int[] out = new int[total];
        int at = 0;
        for (int i = 0; i < nums.length; i += 2) {
            for (int k = 0; k < nums[i]; ++k) {
                out[at++] = nums[i + 1];
            }
        }
        return out;
    }
}
