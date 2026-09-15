import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numRabbits(int[] answers) {
        // A rabbit answering k fixes its whole color group at k+1 rabbits,
        // and rabbits with different answers can never share one, so every
        // answer value is an independent subproblem. When k is reported c
        // times, those rabbits fill ceil(c / (k+1)) groups - the most one
        // group can hold - and each group counts in full, whether or not
        // all of its rabbits answered.
        Map<Integer, Integer> count = new HashMap<>();
        for (int answer : answers) {
            count.merge(answer, 1, Integer::sum);
        }
        int total = 0;
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            int group = entry.getKey() + 1;
            total += ((entry.getValue() + group - 1) / group) * group;
        }
        return total;
    }
}
