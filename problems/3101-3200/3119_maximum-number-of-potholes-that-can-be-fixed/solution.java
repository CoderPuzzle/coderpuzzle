import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int maxPotholes(String road, int budget) {
        // Whole long runs are cheapest per pothole (L / (L + 1) grows with
        // L), so take longest runs first; when a full run no longer fits
        // only one partial purchase remains, worth budget - 1 potholes.
        List<Integer> lengths = new ArrayList<>();
        for (String run : road.split("\\.")) {
            if (!run.isEmpty()) {
                lengths.add(run.length());
            }
        }
        lengths.sort(Collections.reverseOrder());
        int fixed = 0;
        for (int length : lengths) {
            if (budget >= length + 1) {
                budget -= length + 1;
                fixed += length;
            } else {
                fixed += Math.max(0, budget - 1);
                break;
            }
        }
        return fixed;
    }
}
