import java.util.*;

class Solution {

    public int countPairs(int[] nums, int target) {
        // Unordered index pairs are unaffected by order, so sorting a copy is
        // safe. Values lie in [-50, 50], so every pair sum stays inside int.
        int[] sortedNums = nums.clone();
        Arrays.sort(sortedNums);
        int answer = 0;
        int lo = 0;
        int hi = sortedNums.length - 1;
        while (lo < hi) {
            if (sortedNums[lo] + sortedNums[hi] < target) {
                answer += hi - lo;
                lo++;
            } else {
                hi--;
            }
        }
        return answer;
    }
}
