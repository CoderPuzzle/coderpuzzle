class Solution {

    public int[] transformArray(int[] nums) {
        // After the parity replacement every entry is 0 or 1, so the sorted
        // result is just zeros for the evens followed by ones for the odds.
        int ones = 0;
        for (int x : nums) {
            ones += x & 1;
        }
        int[] result = new int[nums.length];
        for (int i = nums.length - ones; i < nums.length; i++) {
            result[i] = 1;
        }
        return result;
    }
}
