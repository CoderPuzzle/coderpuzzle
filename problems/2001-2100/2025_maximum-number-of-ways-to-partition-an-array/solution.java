import java.util.HashMap;
import java.util.Map;

class Solution {

    public int waysToPartition(int[] nums, int k) {
        long total = 0;
        for (int value : nums) total += value;

        Map<Long, Integer> right = new HashMap<>();
        long prefix = 0;
        for (int pivot = 1; pivot < nums.length; ++pivot) {
            prefix += nums[pivot - 1];
            long difference = 2 * prefix - total;
            right.put(difference, right.getOrDefault(difference, 0) + 1);
        }

        Map<Long, Integer> left = new HashMap<>();
        int answer = right.getOrDefault(0L, 0);
        prefix = 0;
        for (int index = 0; index < nums.length; ++index) {
            long delta = (long) k - nums[index];
            answer = Math.max(answer, left.getOrDefault(delta, 0) + right.getOrDefault(-delta, 0));

            if (index < nums.length - 1) {
                prefix += nums[index];
                long difference = 2 * prefix - total;
                right.put(difference, right.get(difference) - 1);
                left.put(difference, left.getOrDefault(difference, 0) + 1);
            }
        }

        return answer;
    }
}
