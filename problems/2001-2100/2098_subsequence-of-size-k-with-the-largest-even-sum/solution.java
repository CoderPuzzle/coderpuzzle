import java.util.Arrays;

class Solution {

    public long largestEvenSum(int[] nums, int k) {
        Arrays.sort(nums);
        long total = 0;
        int[] smallestSelected = { -1, -1 };
        for (int index = nums.length - 1; index >= nums.length - k; index--) {
            total += nums[index];
            smallestSelected[nums[index] % 2] = nums[index];
        }
        if (total % 2 == 0) {
            return total;
        }

        int[] largestUnselected = { -1, -1 };
        for (int index = nums.length - k - 1; index >= 0; index--) {
            int parity = nums[index] % 2;
            if (largestUnselected[parity] == -1) {
                largestUnselected[parity] = nums[index];
            }
        }

        long answer = -1;
        for (int parity = 0; parity < 2; parity++) {
            if (smallestSelected[parity] != -1 && largestUnselected[1 - parity] != -1) {
                answer = Math.max(answer, total - smallestSelected[parity] + largestUnselected[1 - parity]);
            }
        }
        return answer;
    }
}
