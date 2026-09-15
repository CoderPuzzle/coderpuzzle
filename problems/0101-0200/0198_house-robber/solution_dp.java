class Solution {

    public int rob(int[] nums) {
        // Rolling two-variable DP: cur = best through house i-1, prev = best
        // through house i-2; both start at 0 ("nothing robbed yet").
        int prev = 0,
            cur = 0;
        for (int x : nums) {
            // Skip this house (keep cur) or rob it (prev + x).
            int next = Math.max(cur, prev + x);
            prev = cur;
            cur = next;
        }
        return cur;
    }
}
