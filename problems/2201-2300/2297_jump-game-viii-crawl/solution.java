import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public long minCost(int[] nums, int[] costs) {
        int n = nums.length;
        int[] nextGe = new int[n];
        int[] nextLt = new int[n];
        Arrays.fill(nextGe, -1);
        Arrays.fill(nextLt, -1);
        Deque<Integer> greaterStack = new ArrayDeque<>();
        Deque<Integer> lowerStack = new ArrayDeque<>();
        for (int index = n - 1; index >= 0; index--) {
            while (!greaterStack.isEmpty() && nums[greaterStack.peek()] < nums[index]) {
                greaterStack.pop();
            }
            if (!greaterStack.isEmpty()) {
                nextGe[index] = greaterStack.peek();
            }
            greaterStack.push(index);
            while (!lowerStack.isEmpty() && nums[lowerStack.peek()] >= nums[index]) {
                lowerStack.pop();
            }
            if (!lowerStack.isEmpty()) {
                nextLt[index] = lowerStack.peek();
            }
            lowerStack.push(index);
        }
        long[] best = new long[n];
        Arrays.fill(best, 1L << 62);
        best[0] = 0;
        for (int index = 0; index < n; index++) {
            int[] targets = { nextGe[index], nextLt[index] };
            for (int target : targets) {
                if (target != -1 && best[index] + costs[target] < best[target]) {
                    best[target] = best[index] + costs[target];
                }
            }
        }
        return best[n - 1];
    }
}
