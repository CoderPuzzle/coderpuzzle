import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] prisonAfterNDays(int[] cells, int n) {
        // Eight two-state cells admit at most 256 rows, and day one vacates
        // both end cells, leaving 64 — the deterministic daily map must
        // loop. Hash each row (as its 8-bit mask) to its first day; when
        // the row reappears on day `day` after first being seen on day
        // `first`, the future repeats that day - first cycle, so only
        // (n - day) % cycle further transitions remain.
        Map<Integer, Integer> seen = new HashMap<>();
        int state = mask(cells);
        int day = 0;
        while (day < n && !seen.containsKey(state)) {
            seen.put(state, day);
            cells = nextDay(cells);
            state = mask(cells);
            day++;
        }
        if (day < n) {
            int cycle = day - seen.get(state);
            for (int i = 0; i < (n - day) % cycle; i++) {
                cells = nextDay(cells);
            }
        }
        return cells;
    }

    private static int[] nextDay(int[] cells) {
        int[] next = new int[8];
        for (int i = 1; i < 7; i++) {
            next[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
        }
        return next;
    }

    private static int mask(int[] cells) {
        int bits = 0;
        for (int value : cells) {
            bits = (bits << 1) | value;
        }
        return bits;
    }
}
