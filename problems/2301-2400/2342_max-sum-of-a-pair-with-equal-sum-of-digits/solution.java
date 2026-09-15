import java.util.*;

class Solution {

    public int maximumSum(int[] nums) {
        // The largest pair sum with a given first element is bounded by the
        // bucket's two largest values (each <= 10^9), so the running answer
        // stays inside int.
        Map<Integer, Integer> bestByDigitSum = new HashMap<>();
        int answer = -1;
        for (int num : nums) {
            int digitSum = 0;
            for (int value = num; value > 0; value /= 10) {
                digitSum += value % 10;
            }
            Integer best = bestByDigitSum.get(digitSum);
            if (best != null) {
                answer = Math.max(answer, best + num);
                bestByDigitSum.put(digitSum, Math.max(best, num));
            } else {
                bestByDigitSum.put(digitSum, num);
            }
        }
        return answer;
    }
}
