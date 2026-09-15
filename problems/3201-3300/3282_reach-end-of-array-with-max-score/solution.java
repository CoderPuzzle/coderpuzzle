class Solution {

    public long findMaximumScore(int[] nums) {
        // The optimal first hop out of any position lands on the nearest
        // later index holding a strictly greater value: everything in
        // between is at most the current value, so any detour's legs earn
        // no more per unit of distance than staying put over the same
        // ground, while the leg beyond the swap gains the strictly larger
        // rate. When no greater value remains, jumping straight to the
        // last index is optimal by the same telescoping bound. Precompute
        // those nearest greater neighbors with a right-to-left monotonic
        // stack, then walk the chain.
        int n = nums.length;
        int[] jump = new int[n];
        for (int i = 0; i < n; i++) {
            jump[i] = n - 1;
        }
        int[] stack = new int[n];
        int top = -1;
        for (int i = n - 1; i >= 0; i--) {
            while (top >= 0 && nums[stack[top]] <= nums[i]) {
                top--;
            }
            if (top >= 0) {
                jump[i] = stack[top];
            }
            stack[++top] = i;
        }
        long score = 0;
        int pos = 0;
        while (pos < n - 1) {
            score += (long) (jump[pos] - pos) * nums[pos];
            pos = jump[pos];
        }
        return score;
    }
}
