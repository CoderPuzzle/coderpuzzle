class Solution {

    public int[] getSumAbsoluteDifferences(int[] nums) {
        int n = nums.length;
        long total = 0;
        for (int x : nums) total += x;
        long prefix = 0;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            // Sorted order dissolves the absolute values: every element left
            // of i is <= x and every element right of i is >= x, so each side
            // collapses into one signed sum.
            // Left part: x*i - prefix, the sum of the first i elements.
            long left = (long) x * i - prefix;
            long suffix = total - prefix - x;
            // Right part: suffix sum - x*(n - i - 1).
            long right = suffix - (long) x * (n - i - 1);
            // Ties are exact — equal values contribute 0 on either side.
            result[i] = (int) (left + right);
            prefix += x;
        }
        return result;
    }
}
