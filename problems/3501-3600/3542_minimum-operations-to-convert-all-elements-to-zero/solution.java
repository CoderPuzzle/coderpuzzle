class Solution {

    public int minOperations(int[] nums) {
        // Monotonic stack of the minima of currently open windows. An
        // element equal to the top continues that window's group (same
        // operation), a larger element opens a new group (one more
        // operation), and anything smaller — including 0 — closes every
        // window above it.
        int ans = 0;
        int[] stack = new int[nums.length];
        int top = 0;
        for (int x : nums) {
            while (top > 0 && stack[top - 1] > x) top--;
            if (x > 0 && (top == 0 || stack[top - 1] < x)) {
                stack[top++] = x;
                ans++;
            }
        }
        return ans;
    }
}
