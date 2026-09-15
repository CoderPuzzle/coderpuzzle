import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] mostCommonCoursePair(String[][] completions) {
        // Group rows per student; every student is judged and sorted
        // independently of the rest.
        Map<String, List<String[]>> byStudent = new HashMap<>();
        for (String[] row : completions) {
            byStudent.computeIfAbsent(row[0], key -> new ArrayList<>()).add(new String[] { row[2], row[1], row[3] });
        }
        Map<String, Integer> counts = new HashMap<>();
        for (List<String[]> records : byStudent.values()) {
            // Qualification without floats: sum >= 4 * n is exactly
            // "average >= 4" over integer ratings.
            int n = records.size();
            if (n < 5) {
                continue;
            }
            int total = 0;
            for (String[] record : records) {
                total += Integer.parseInt(record[2]);
            }
            if (total < 4 * n) {
                continue;
            }
            // (date, course) sorts chronologically, name-breaking ties.
            records.sort((a, b) -> {
                int byDate = a[0].compareTo(b[0]);
                if (byDate != 0) {
                    return byDate;
                }
                return a[1].compareTo(b[1]);
            });
            for (int i = 1; i < n; i++) {
                String key = records.get(i - 1)[1] + " " + records.get(i)[1];
                counts.merge(key, 1, Integer::sum);
            }
        }
        String bestPair = null;
        int bestCount = -1;
        // Sorted keys + strict > pin count-descending, then both names
        // ascending — no dependence on hash-map iteration order.
        List<String> keys = new ArrayList<>(counts.keySet());
        keys.sort(null);
        for (String key : keys) {
            if (counts.get(key) > bestCount) {
                bestCount = counts.get(key);
                bestPair = key;
            }
        }
        if (bestPair == null) {
            return new String[0];
        }
        int split = bestPair.indexOf(' ');
        return new String[] { bestPair.substring(0, split), bestPair.substring(split + 1), String.valueOf(bestCount) };
    }
}
