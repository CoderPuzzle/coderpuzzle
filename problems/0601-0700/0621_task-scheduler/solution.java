import java.util.HashMap;
import java.util.Map;

class Solution {

    public int leastInterval(String[] tasks, int n) {
        Map<String, Integer> counts = new HashMap<>();
        for (String t : tasks) {
            counts.merge(t, 1, Integer::sum);
        }
        int maxFreq = 0;
        int numMax = 0;
        for (int v : counts.values()) {
            if (v > maxFreq) {
                maxFreq = v;
                numMax = 1;
            } else if (v == maxFreq) {
                // Letters tying the max each occupy one slot of the final partial run.
                numMax++;
            }
        }
        // The bottleneck letter frames (maxFreq - 1) cycles of n + 1 plus the
        // final run; enough distinct tasks fill every gap, so never answer
        // less than the plain task count.
        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + numMax);
    }
}
