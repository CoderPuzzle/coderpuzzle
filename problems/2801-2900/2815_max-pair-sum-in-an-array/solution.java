import java.util.*;

class Solution {

    public int maxSum(int[] nums) {
        // Every value is at most 10^4, so any pair sum stays inside int.
        Map<Integer, Integer> bestByLargestDigit = new HashMap<>();
        int answer = -1;
        for (int num : nums) {
            int largestDigit = 0;
            for (int value = num; value > 0; value /= 10) {
                largestDigit = Math.max(largestDigit, value % 10);
            }
            Integer best = bestByLargestDigit.get(largestDigit);
            if (best != null) {
                answer = Math.max(answer, best + num);
                bestByLargestDigit.put(largestDigit, Math.max(best, num));
            } else {
                bestByLargestDigit.put(largestDigit, num);
            }
        }
        return answer;
    }
}
