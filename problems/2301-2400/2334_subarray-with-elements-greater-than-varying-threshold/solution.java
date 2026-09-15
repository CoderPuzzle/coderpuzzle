class Solution {

    public int validSubarraySize(int[] nums, int threshold) {
        int n = nums.length;
        // next_le[i] = nearest index j > i with nums[j] <= nums[i]
        int[] nextLe = new int[n];
        int[] stack = new int[n];
        int top = -1;
        for (int i = n - 1; i >= 0; i--) {
            while (top >= 0 && nums[stack[top]] > nums[i]) {
                top--;
            }
            nextLe[i] = top >= 0 ? stack[top] : n;
            stack[++top] = i;
        }

        // prev_lt[i] = nearest index j < i with nums[j] < nums[i]
        int[] prevLt = new int[n];
        top = -1;
        for (int i = 0; i < n; i++) {
            while (top >= 0 && nums[stack[top]] >= nums[i]) {
                top--;
            }
            prevLt[i] = top >= 0 ? stack[top] : -1;
            stack[++top] = i;
        }

        int best = -1;
        for (int i = 0; i < n; i++) {
            int span = nextLe[i] - prevLt[i] - 1;
            int k = threshold / nums[i] + 1;
            if (k <= span && (best == -1 || k < best)) {
                best = k;
            }
        }
        return best;
    }
}
