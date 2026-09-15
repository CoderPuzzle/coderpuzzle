import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[] relocateMarbles(int[] nums, int[] moveFrom, int[] moveTo) {
        // Only occupancy matters: a move relocates every marble sitting on a
        // position at once, so one set of occupied positions tracks the state.
        Set<Integer> occupied = new HashSet<>();
        for (int position : nums) {
            occupied.add(position);
        }
        // In order: vacate the source, occupy the target. A self-move removes
        // and re-adds the same position; merging into an occupied target is
        // just a set add.
        for (int step = 0; step < moveFrom.length; ++step) {
            occupied.remove(moveFrom[step]);
            occupied.add(moveTo[step]);
        }
        List<Integer> live = new ArrayList<>(occupied);
        Collections.sort(live);
        int[] answer = new int[live.size()];
        for (int index = 0; index < answer.length; ++index) {
            answer[index] = live.get(index);
        }
        return answer;
    }
}
