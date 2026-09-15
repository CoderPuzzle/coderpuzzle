class Solution {

    public int[] concatWithReverse(int[] nums) {
        int n = nums.length;
        int[] answer = new int[2 * n];
        for (int i = 0; i < n; i++) {
            answer[i] = nums[i];
            answer[n + i] = nums[n - i - 1];
        }
        return answer;
    }
}
