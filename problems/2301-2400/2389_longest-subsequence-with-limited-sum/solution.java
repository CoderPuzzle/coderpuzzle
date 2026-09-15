class Solution {

    public int[] answerQueries(int[] nums, int[] queries) {
        // The longest subsequence under a sum cap uses the smallest
        // elements: sort, prefix-sum, then count prefixes <= query by
        // binary search (first index whose prefix exceeds the query).
        java.util.Arrays.sort(nums);
        for (int i = 1; i < nums.length; ++i) {
            nums[i] += nums[i - 1];
        }
        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            int lo = 0;
            int hi = nums.length;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (nums[mid] <= queries[i]) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            answer[i] = lo;
        }
        return answer;
    }
}
