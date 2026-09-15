class Solution {

    public int minStartValue(int[] nums) {
        int minPrefix = 0;
        int prefix = 0;
        for (int x : nums) {
            prefix += x;
            minPrefix = Math.min(minPrefix, prefix);
        }
        return Math.max(1, 1 - minPrefix);
    }
}
