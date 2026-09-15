class Solution {

    public boolean[] pathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {
        // nums is sorted, so any edge i-j (i < j) forces every consecutive
        // pair between them to be an edge too — components are contiguous
        // segments, cut wherever a gap exceeds maxDiff.
        int[] comp = new int[n];
        for (int i = 1; i < n; i++) {
            comp[i] = comp[i - 1] + (nums[i] - nums[i - 1] > maxDiff ? 1 : 0);
        }
        boolean[] answer = new boolean[queries.length];
        for (int i = 0; i < queries.length; i++) {
            answer[i] = comp[queries[i][0]] == comp[queries[i][1]];
        }
        return answer;
    }
}
