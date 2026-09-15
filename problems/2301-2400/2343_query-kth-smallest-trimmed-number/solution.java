import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] smallestTrimmedNumbers(String[] nums, int[][] queries) {
        // All strings share one length, so trimmed suffixes do too, and
        // lexicographic order on equal-length digit strings equals numeric
        // order — no numeric conversion needed (suffixes can exceed 64 bits).
        int[] answer = new int[queries.length];
        Integer[] order = new Integer[nums.length];
        for (int i = 0; i < order.length; i++) {
            order[i] = i;
        }
        for (int q = 0; q < queries.length; q++) {
            int k = queries[q][0];
            int trim = queries[q][1];
            Arrays.sort(order, (left, right) -> {
                String a = nums[left].substring(nums[left].length() - trim);
                String b = nums[right].substring(nums[right].length() - trim);
                if (!a.equals(b)) return a.compareTo(b);
                return left - right;
            });
            answer[q] = order[k - 1];
        }
        return answer;
    }
}
