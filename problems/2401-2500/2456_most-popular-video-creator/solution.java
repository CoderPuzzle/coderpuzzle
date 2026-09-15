import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[][] mostPopularCreator(String[] creators, String[] ids, int[] views) {
        // One pass keeps three running values per creator: total views,
        // best single-video view count, and the id achieving it
        // (lexicographically smallest on a tie). Totals reach
        // 10^5 * 10^5 = 10^10, which overflows a 32-bit int, so sums are long.
        Map<String, Long> totals = new HashMap<>();
        Map<String, Integer> bestView = new HashMap<>();
        Map<String, String> bestId = new HashMap<>();
        for (int i = 0; i < creators.length; i++) {
            String creator = creators[i];
            totals.merge(creator, (long) views[i], Long::sum);
            Integer current = bestView.get(creator);
            if (
                current == null ||
                views[i] > current ||
                (views[i] == current && ids[i].compareTo(bestId.get(creator)) < 0)
            ) {
                bestView.put(creator, views[i]);
                bestId.put(creator, ids[i]);
            }
        }
        long top = 0;
        for (long total : totals.values()) {
            top = Math.max(top, total);
        }
        List<String[]> rows = new ArrayList<>();
        for (Map.Entry<String, Long> entry : totals.entrySet()) {
            if (entry.getValue() == top) {
                rows.add(new String[] { entry.getKey(), bestId.get(entry.getKey()) });
            }
        }
        return rows.toArray(new String[0][]);
    }
}
