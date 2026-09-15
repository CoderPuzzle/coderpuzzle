class Solution {

    // Every operation lowers the total sum by exactly 1, and the elements
    // only bound how many operations are even possible (sum in total),
    // never the residue. So the cheapest reachable sum that is divisible
    // by k is the largest multiple of k not exceeding the sum, and the
    // answer is the distance down to it: sum % k.
    public int minOperations(int[] nums, int k) {
        long total = 0;
        for (int v : nums) {
            total += v;
        }
        return (int) (total % k);
    }
}
