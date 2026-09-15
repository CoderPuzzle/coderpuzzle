import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minimumRounds(int[] tasks) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int task : tasks) {
            counts.merge(task, 1, Integer::sum);
        }
        int rounds = 0;
        for (int count : counts.values()) {
            if (count == 1) {
                return -1;
            }
            rounds += (count + 2) / 3;
        }
        return rounds;
    }
}
