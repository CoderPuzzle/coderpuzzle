import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] findXSum(int[] nums, int k, int x) {
        // n <= 50, so each window is recounted directly: one count map per
        // window, then the distinct values sorted by count descending with
        // the value itself breaking ties. Taking the first x of that order
        // keeps every distinct value when fewer than x exist, which is
        // exactly the "x-sum is the array sum" rule.
        int[] answer = new int[nums.length - k + 1];
        for (int start = 0; start + k <= nums.length; ++start) {
            Map<Integer, Integer> counts = new HashMap<>();
            for (int i = start; i < start + k; ++i) {
                counts.merge(nums[i], 1, Integer::sum);
            }
            List<Integer> top = new ArrayList<>(counts.keySet());
            top.sort((a, b) -> counts.get(b) - counts.get(a) != 0 ? counts.get(b) - counts.get(a) : b - a);
            // Sums stay within k * 50 = 2500, so int carries everything.
            int total = 0;
            for (int i = 0; i < x && i < top.size(); ++i) {
                total += top.get(i) * counts.get(top.get(i));
            }
            answer[start] = total;
        }
        return answer;
    }
}
