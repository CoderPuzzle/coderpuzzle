class Solution {

    public int[] orArray(int[] nums) {
        int[] answer = new int[nums.length - 1];
        for (int i = 0; i < nums.length - 1; i++) {
            answer[i] = nums[i] | nums[i + 1];
        }
        return answer;
    }
}
