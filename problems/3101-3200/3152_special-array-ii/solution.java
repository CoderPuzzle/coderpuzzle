class Solution {

    public boolean[] isArraySpecial(int[] nums, int[][] queries) {
        int n = nums.length;
        int[] reach = new int[n];
        for (int i = 1; i < n; i++) {
            reach[i] = (nums[i - 1] & 1) == (nums[i] & 1) ? i : reach[i - 1];
        }
        boolean[] answer = new boolean[queries.length];
        for (int i = 0; i < queries.length; i++) {
            answer[i] = reach[queries[i][1]] <= queries[i][0];
        }
        return answer;
    }
}
