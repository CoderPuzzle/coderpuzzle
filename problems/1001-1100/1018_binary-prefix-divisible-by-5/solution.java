class Solution {

    public boolean[] prefixesDivBy5(int[] nums) {
        boolean[] answer = new boolean[nums.length];
        int rem = 0;
        for (int i = 0; i < nums.length; i++) {
            rem = (rem * 2 + nums[i]) % 5;
            answer[i] = rem == 0;
        }
        return answer;
    }
}
