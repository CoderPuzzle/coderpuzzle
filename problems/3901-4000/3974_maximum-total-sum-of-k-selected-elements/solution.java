import java.util.Arrays;

class Solution {

    public long maxSum(int[] nums, int k, int mul) {
        Arrays.sort(nums);
        long answer = 0;
        int take = Math.min(k, Math.max(0, mul - 1));
        for (int i = 0; i < k; i++) answer += (long) nums[nums.length - 1 - i] * (i < take ? mul - i : 1);
        return answer;
    }
}
