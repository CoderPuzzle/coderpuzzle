class Solution {

    public int[] minDifference(int[] nums, int[][] queries) {
        // With values capped at 100, a value is either present in a
        // range or not, and 100 prefix-count rows decide that in O(1):
        // row v holds the occurrence count of v over every prefix of
        // nums, so v appears in nums[l..r] exactly when its count rises
        // between l and r+1. A query then walks the value axis 1..100,
        // collects the values whose counts rise, and takes the smallest
        // gap between consecutive ones — present values arrive in
        // increasing order, and the minimum |a[i] - a[j]| over a set
        // always sits between value-adjacent elements. Fewer than two
        // rising rows means every element in the range matches, so the
        // answer is -1; with two or more the gap is at most 99, which
        // is what makes the untouched sentinel honest. The
        // 100 x (n+1) int table is ~40 MB — inside the memory budget —
        // and every count fits 32-bit by construction.
        int n = nums.length;
        int[][] pre = new int[101][n + 1];
        for (int v = 1; v <= 100; ++v) {
            for (int i = 0; i < n; ++i) {
                pre[v][i + 1] = pre[v][i] + (nums[i] == v ? 1 : 0);
            }
        }
        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; ++q) {
            int l = queries[q][0];
            int r1 = queries[q][1] + 1;
            int prev = -1;
            int best = 100;
            for (int v = 1; v <= 100; ++v) {
                if (pre[v][r1] != pre[v][l]) {
                    if (prev >= 0 && v - prev < best) best = v - prev;
                    prev = v;
                }
            }
            answer[q] = best < 100 ? best : -1;
        }
        return answer;
    }
}
