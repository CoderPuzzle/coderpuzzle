import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] majorityElement(int[] nums) {
        // A hash map counts every occurrence directly: one sweep tallies each
        // value into a table keyed by the value itself, and the map ends up
        // holding each distinct value's exact frequency.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        // At most two values can clear the n/3 bar, so one selection pass
        // over the entries finds the only two tallies that can matter: a
        // strictly greater tally takes the top slot, demoting the leader,
        // and ties keep the earlier entry — harmless, since equal tallies
        // qualify or fail together.
        int threshold = nums.length / 3;
        int bestValue = 0;
        int bestCount = 0;
        int secondValue = 0;
        int secondCount = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int value = entry.getKey();
            int count = entry.getValue();
            if (count > bestCount) {
                secondValue = bestValue;
                secondCount = bestCount;
                bestValue = value;
                bestCount = count;
            } else if (count > secondCount) {
                secondValue = value;
                secondCount = count;
            }
        }
        // Selection only nominates; the threshold check is where an
        // exactly-n/3 value is excluded and an unfilled slot — a tally of
        // zero — fails. Map keys are distinct, so the slots cannot collide.
        List<Integer> result = new ArrayList<>();
        if (bestCount > threshold) result.add(bestValue);
        if (secondCount > threshold) result.add(secondValue);
        // At most two answers survive; sorting pins the ascending order the
        // examples show.
        Collections.sort(result);
        int[] answer = new int[result.size()];
        for (int index = 0; index < answer.length; ++index) answer[index] = result.get(index);
        return answer;
    }
}
