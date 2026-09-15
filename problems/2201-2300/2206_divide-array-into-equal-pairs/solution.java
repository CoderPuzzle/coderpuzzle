class Solution {

    public boolean divideArray(int[] nums) {
        // Values are bounded to [1, 500], so a fixed counting table answers
        // "is every value's occurrence count even?" in one pass.
        int[] counts = new int[501];
        for (int value : nums) {
            counts[value]++;
        }
        for (int count : counts) {
            if (count % 2 != 0) {
                return false;
            }
        }
        return true;
    }
}
