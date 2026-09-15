class Solution {

    public int[] twoSum(int[] numbers, int target) {
        int left = 0,
            right = numbers.length - 1;
        while (left < right) {
            int total = numbers[left] + numbers[right];
            if (total == target) {
                // 1-based indices as the problem expects.
                return new int[] { left + 1, right + 1 };
            } else if (total < target) {
                // Too small: pairing numbers[left] with anything smaller than
                // numbers[right] only lowers the sum — retire the left value.
                ++left;
            } else {
                // Too large: retire the right value symmetrically.
                --right;
            }
        }
        // Unreachable under the uniqueness promise; keeps the function total.
        return new int[] {};
    }
}
