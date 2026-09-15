import java.util.Arrays;

class Solution {

    public boolean isGood(int[] nums) {
        // A permutation of base[m] has maximum m and length m + 1, so the
        // maximum leaves exactly one candidate array to match. Sort a copy
        // of nums and compare it against the literally constructed
        // [1, ..., m - 1, m, m]. For m = 1 the ascending range is empty and
        // the expected array is just [1, 1], which is base[1] itself.
        int largest = 0;
        for (int value : nums) {
            largest = Math.max(largest, value);
        }
        if (nums.length != largest + 1) {
            // base[m] has length m + 1; a disagreement rules out every base.
            return false;
        }
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);
        int[] expected = new int[largest + 1];
        for (int value = 1; value < largest; ++value) {
            expected[value - 1] = value;
        }
        expected[largest - 1] = largest;
        expected[largest] = largest;
        return Arrays.equals(sortedNums, expected);
    }
}
