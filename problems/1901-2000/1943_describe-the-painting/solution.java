import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

class Solution {

    public long[][] splitPainting(int[][] segments) {
        // Difference events per segment: +color at its start, -color at its
        // end. The mixed sum is piecewise constant and can only change at
        // these coordinates.
        TreeMap<Long, Long> diff = new TreeMap<>();
        for (int[] seg : segments) {
            long start = seg[0];
            long end = seg[1];
            long color = seg[2];
            diff.merge(start, color, Long::sum);
            diff.merge(end, -color, Long::sum);
        }
        List<long[]> result = new ArrayList<>();
        long running = 0;
        Long prevKey = null;
        for (Map.Entry<Long, Long> e : diff.entrySet()) {
            if (prevKey != null) {
                // Between consecutive event coordinates the active set is
                // fixed, so running is the mixed color on that open interval.
                // Colors are distinct, so each event genuinely changes the
                // sum -- emitting at every coordinate is minimal.
                if (running > 0) {
                    // skip unpainted gaps: nothing is active
                    result.add(new long[] { prevKey, e.getKey(), running });
                }
            }
            running += e.getValue();
            prevKey = e.getKey();
        }
        long[][] ans = new long[result.size()][];
        for (int i = 0; i < result.size(); i++) ans[i] = result.get(i);
        return ans;
    }
}
