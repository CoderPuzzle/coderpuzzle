class Solution {

    public int minOperations(int[] nums) {
        int n = nums.length;
        int operations = 0;
        // The leftmost 0 can only be fixed by the one flip starting there, so
        // every position whose running value is 0 forces exactly one operation.
        for (int i = 0; i + 2 < n; i++) {
            if (nums[i] == 0) {
                operations++;
                nums[i] ^= 1;
                nums[i + 1] ^= 1;
                nums[i + 2] ^= 1;
            }
        }
        // The sweep leaves positions 0..n-3 all 1; the last two cells can no
        // longer be operated on, so a surviving 0 means the array is unfixable.
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) return -1;
        }
        // Each counted flip was forced, so no cheaper sequence of flips exists.
        return operations;
    }
}
