class Solution {

    public int countValidSubarrays(int[] nums, int x) {
        int answer = 0;
        for (int left = 0; left < nums.length; left++) {
            long sum = 0;
            for (int right = left; right < nums.length; right++) {
                sum += nums[right];
                long first = sum;
                while (first >= 10) first /= 10;
                if (first == x && sum % 10 == x) answer++;
            }
        }
        return answer;
    }
}
