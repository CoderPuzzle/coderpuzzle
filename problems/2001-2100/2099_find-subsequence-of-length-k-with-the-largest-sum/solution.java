import java.util.Arrays;

class Solution {

    public int[] maxSubsequence(int[] nums, int k) {
        Integer[] indices = new Integer[nums.length];
        for (int index = 0; index < nums.length; index++) {
            indices[index] = index;
        }
        Arrays.sort(indices, (left, right) -> {
            int byValue = Integer.compare(nums[right], nums[left]);
            return byValue != 0 ? byValue : Integer.compare(left, right);
        });

        Integer[] chosen = Arrays.copyOf(indices, k);
        Arrays.sort(chosen);
        int[] answer = new int[k];
        for (int index = 0; index < k; index++) {
            answer[index] = nums[chosen[index]];
        }
        return answer;
    }
}
