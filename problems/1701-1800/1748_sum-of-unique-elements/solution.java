class Solution {

    public int sumOfUnique(int[] nums) {
        // An element counts only if it appears exactly once. Values are
        // bounded to 1..100, so a fixed frequency table settles every
        // element in one pass; a second sweep sums the singletons.
        int[] count = new int[101];
        for (int v : nums) {
            count[v]++;
        }
        int sum = 0;
        for (int v : nums) {
            if (count[v] == 1) {
                sum += v;
            }
        }
        return sum;
    }
}
