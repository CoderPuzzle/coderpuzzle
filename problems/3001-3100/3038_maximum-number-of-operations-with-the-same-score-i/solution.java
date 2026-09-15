class Solution {

    public int maxOperations(int[] nums) {
        // The first operation is forced: its score fixes the target sum
        // every later operation must repeat.
        int score = nums[0] + nums[1];
        int operations = 1;
        // Greedily consume consecutive pairs while each sums to that score;
        // the first mismatch (or a lone leftover element) ends the run.
        for (int i = 2; i + 1 < nums.length; i += 2) {
            if (nums[i] + nums[i + 1] != score) {
                break;
            }
            operations++;
        }
        return operations;
    }
}
