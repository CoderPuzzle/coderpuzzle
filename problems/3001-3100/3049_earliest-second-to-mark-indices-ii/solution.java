import java.util.PriorityQueue;

class Solution {

    public int earliestSecondToMarkIndices(int[] nums, int[] changeIndices) {
        int n = nums.length;
        int m = changeIndices.length;

        // first occurrence (0-indexed second) of each index whose nums value is > 0
        int[] first = new int[n];
        java.util.Arrays.fill(first, -1);
        for (int i = m - 1; i >= 0; i--) {
            int idx = changeIndices[i] - 1;
            if (nums[idx] != 0) {
                first[idx] = i;
            }
        }

        long total = n;
        long low = n;
        for (int i = 0; i < n; i++) {
            total += nums[i];
            low += first[i] != -1 ? 1 : nums[i];
        }
        long high = m;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (check(nums, changeIndices, first, total, (int) mid)) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low <= m ? (int) low : -1;
    }

    private boolean check(int[] nums, int[] changeIndices, int[] first, long total, int t) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        long cnt = 0;
        long sum = 0;
        for (int i = t - 1; i >= 0; i--) {
            int idx = changeIndices[i] - 1;
            if (i != first[idx]) {
                cnt += 1;
                continue;
            }
            minHeap.offer(nums[idx]);
            sum += nums[idx];
            if (cnt > 0) {
                cnt -= 1;
            } else {
                cnt += 1;
                sum -= minHeap.poll();
            }
        }
        return total - (sum + minHeap.size()) <= cnt;
    }
}
