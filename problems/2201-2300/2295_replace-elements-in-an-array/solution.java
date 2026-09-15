import java.util.Arrays;

class Solution {

    public int[] arrayChange(int[] nums, int[][] operations) {
        int[] finalName = new int[1000001];
        Arrays.fill(finalName, -1);
        for (int index = operations.length - 1; index >= 0; index--) {
            int replaced = operations[index][0];
            int replacement = operations[index][1];
            finalName[replaced] = finalName[replacement] == -1 ? replacement : finalName[replacement];
        }
        int[] answer = new int[nums.length];
        for (int index = 0; index < nums.length; index++) {
            answer[index] = finalName[nums[index]] == -1 ? nums[index] : finalName[nums[index]];
        }
        return answer;
    }
}
