class Solution {

    public int[] mostCompetitive(int[] nums, int k) {
        // "Most competitive" is the lexicographically smallest length-k
        // subsequence — build it as a non-decreasing stack in one pass.
        int[] stack = new int[k];
        int top = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            int value = nums[i];
            int remaining = n - i;
            // Drop strictly larger tops while enough unread values remain
            // to refill to k; the strict > keeps the earlier of equal
            // values, which changes nothing lexicographically.
            while (top > 0 && stack[top - 1] > value && top + remaining > k) {
                top--;
            }
            // Append only while there is room; a full stack can only
            // change through eviction above.
            if (top < k) {
                stack[top++] = value;
            }
        }
        return stack;
    }
}
