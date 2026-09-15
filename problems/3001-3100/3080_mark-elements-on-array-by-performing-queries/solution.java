import java.util.Arrays;

class Solution {

    public long[] unmarkedSumArray(int[] nums, int[][] queries) {
        // Marking only ever removes elements, so one monotone sweep over the
        // indices sorted by (value, index) answers every query's "k smallest
        // unmarked" step: the pointer skips entries marked by name and never
        // revisits one. A running total absorbs each mark — it can reach
        // 10^5 * 10^5 = 10^10, beyond int, so every total is a long.
        int n = nums.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : Integer.compare(a, b));
        boolean[] marked = new boolean[n];
        long total = 0;
        for (int num : nums) {
            total += num;
        }
        int pointer = 0;
        long[] answer = new long[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int index = queries[q][0];
            int count = queries[q][1];
            if (!marked[index]) {
                marked[index] = true;
                total -= nums[index];
            }
            int taken = 0;
            while (taken < count && pointer < n) {
                int candidate = order[pointer];
                pointer++;
                if (marked[candidate]) {
                    continue;
                }
                marked[candidate] = true;
                total -= nums[candidate];
                taken++;
            }
            answer[q] = total;
        }
        return answer;
    }
}
