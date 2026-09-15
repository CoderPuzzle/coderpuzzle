import java.util.HashMap;
import java.util.Map;

class Solution {

    public int destroyTargets(int[] nums, int space) {
        // Two targets are destroyed by one seed exactly when their values
        // share a residue modulo space (their difference is a multiple of
        // space), so group nums by nums[i] % space. The smallest value of
        // the largest group seeds the machine and wipes the whole group.
        Map<Integer, Integer> counts = new HashMap<>();
        Map<Integer, Integer> mins = new HashMap<>();
        for (int value : nums) {
            int r = value % space;
            counts.merge(r, 1, Integer::sum);
            mins.merge(r, value, Math::min);
        }
        int best = 0;
        for (int count : counts.values()) {
            best = Math.max(best, count);
        }
        int answer = Integer.MAX_VALUE;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == best) {
                answer = Math.min(answer, mins.get(entry.getKey()));
            }
        }
        return answer;
    }
}
