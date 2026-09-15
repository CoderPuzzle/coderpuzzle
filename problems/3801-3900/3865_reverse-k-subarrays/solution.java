class Solution {

    public int[] reverseSubarrays(int[] nums, int k) {
        // Each block holds m = n / k elements. A two-pointer sweep swaps
        // the ends of a block inward, mirroring the "Two Pointers" tag, and
        // the blocks are visited left to right; the copy keeps the input
        // array untouched.
        int m = nums.length / k;
        int[] result = nums.clone();
        for (int start = 0; start < nums.length; start += m) {
            int i = start;
            int j = start + m - 1;
            while (i < j) {
                int tmp = result[i];
                result[i] = result[j];
                result[j] = tmp;
                i++;
                j--;
            }
        }
        return result;
    }
}
