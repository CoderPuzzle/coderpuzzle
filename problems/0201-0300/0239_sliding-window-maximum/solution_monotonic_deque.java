class Solution {

    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] deque = new int[n]; // indices, values decreasing
        int head = 0,
            tail = 0; // half-open range [head, tail)
        int[] result = new int[Math.max(0, n - k + 1)];
        int ri = 0;
        for (int i = 0; i < n; i++) {
            int value = nums[i];
            while (tail > head && nums[deque[tail - 1]] <= value) tail--;
            deque[tail++] = i;
            if (deque[head] <= i - k) head++;
            if (i >= k - 1) result[ri++] = nums[deque[head]];
        }
        return result;
    }
}
