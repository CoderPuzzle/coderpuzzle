import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public boolean pyramidTransition(String bottom, String[] allowed) {
        // For each ordered pair of letters, a bitmask of the letters that
        // may sit on it. A pair with no pattern is a dead end: mask 0.
        Map<Integer, Integer> tops = new HashMap<>();
        for (String t : allowed) {
            int key = (t.charAt(0) - 'A') * 26 + (t.charAt(1) - 'A');
            tops.merge(key, 1 << (t.charAt(2) - 'A'), (x, y) -> x | y);
        }
        Set<String> rows = new HashSet<>();
        rows.add(bottom);
        int width = bottom.length();
        while (width > 1) {
            Set<String> above = new HashSet<>();
            for (String row : rows) {
                // Candidate letters per position of the row above; a zero
                // mask means this row cannot carry anything.
                int[] masks = new int[width - 1];
                boolean alive = true;
                for (int i = 0; i + 1 < width; i++) {
                    int key = (row.charAt(i) - 'A') * 26 + (row.charAt(i + 1) - 'A');
                    int mask = tops.getOrDefault(key, 0);
                    if (mask == 0) {
                        alive = false;
                        break;
                    }
                    masks[i] = mask;
                }
                if (!alive) {
                    continue;
                }
                // The state stays a whole concrete row: adjacent positions
                // above share the row below, so the letter at one position
                // constrains its neighbor. Enumerate the product of the
                // masks; the set dedups rows lifted from different parents.
                List<String> frontier = new ArrayList<>();
                frontier.add("");
                for (int mask : masks) {
                    List<String> lifted = new ArrayList<>();
                    for (String r : frontier) {
                        for (int d = 0; d < 6; d++) {
                            if (((mask >> d) & 1) != 0) {
                                lifted.add(r + (char) ('A' + d));
                            }
                        }
                    }
                    frontier = lifted;
                }
                above.addAll(frontier);
            }
            if (above.isEmpty()) {
                return false;
            }
            rows = above;
            width--;
        }
        return true;
    }
}
