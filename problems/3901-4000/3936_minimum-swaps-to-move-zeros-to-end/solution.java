class Solution {

    public int minimumSwaps(int[] nums) {
        int zeros = 0;
        for (int value : nums) {
            if (value == 0) zeros++;
        }
        int prefixLength = nums.length - zeros;
        int answer = 0;
        for (int i = 0; i < prefixLength; i++) {
            if (nums[i] == 0) answer++;
        }
        return answer;
    }
}
