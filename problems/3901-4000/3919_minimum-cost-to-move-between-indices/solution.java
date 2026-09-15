class Solution {

    public int[] minCost(int[] nums, int[][] queries) {
        int n = nums.length;
        int[] forward = new int[Math.max(n - 1, 0)];
        int[] backward = new int[Math.max(n - 1, 0)];

        for (int i = 0; i < n; i++) {
            int closest;
            if (i == 0) {
                closest = 1;
            } else if (i == n - 1) {
                closest = n - 2;
            } else {
                int left = nums[i] - nums[i - 1];
                int right = nums[i + 1] - nums[i];
                closest = left <= right ? i - 1 : i + 1;
            }
            if (i > 0) {
                backward[i - 1] = closest == i - 1 ? 1 : nums[i] - nums[i - 1];
            }
            if (i < n - 1) {
                forward[i] = closest == i + 1 ? 1 : nums[i + 1] - nums[i];
            }
        }

        long[] prefixForward = new long[n];
        long[] prefixBackward = new long[n];
        for (int i = 1; i < n; i++) {
            prefixForward[i] = prefixForward[i - 1] + forward[i - 1];
            prefixBackward[i] = prefixBackward[i - 1] + backward[i - 1];
        }

        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int left = queries[i][0];
            int right = queries[i][1];
            if (left <= right) {
                answer[i] = (int) (prefixForward[right] - prefixForward[left]);
            } else {
                answer[i] = (int) (prefixBackward[left] - prefixBackward[right]);
            }
        }
        return answer;
    }
}
