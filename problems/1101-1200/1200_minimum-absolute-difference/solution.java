import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public List<List<Integer>> minimumAbsDifference(int[] arr) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        List<List<Integer>> pairs = new ArrayList<>();
        int best = Integer.MAX_VALUE;
        for (int i = 0; i + 1 < sorted.length; i++) {
            int gap = sorted[i + 1] - sorted[i];
            if (gap < best) {
                // A strictly closer neighbour pair retires everything
                // collected against the old minimum.
                best = gap;
                pairs = new ArrayList<>();
            }
            if (gap == best) {
                pairs.add(Arrays.asList(sorted[i], sorted[i + 1]));
            }
        }
        return pairs;
    }
}
